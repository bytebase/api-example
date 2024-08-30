"use client"

import { SetStateAction, useEffect, useState } from "react";

export default function FetchUserPermissionForm({ allUsers, allDatabasePermissions, allProjects, allWorkspaceIam, allRoles, allGroups }) {

    const [userGroups, setUserGroups] = useState([])
    const [user, setUser] = useState('')
    const [permission, setPermission] = useState('')
    const [databasesWithPermission, setDatabasesWithPermission] = useState<Array<{project: string, databases: any[]}>>([])

    const handleSubmit = (e) => { e.preventDefault();}
    const handleSelectUser = (e) => {setUser(e.target.value); setPermission('')};
    const handleSelectPermission = (e) => { setPermission(e.target.value); };

    useEffect(() => {
        if (user || permission) {
            updateDatabasesWithPermission();
        }
    }, [user, permission]);

    const updateDatabasesWithPermission = async () => {
     //   console.log("enter updateDatabasesWithPermission ===================")

        const newDatabasesWithPermission: Array<{project: string, databases: any[]}> = [];

        const rolesWithPermission = allRoles.filter((role) => role.permissions.includes(permission));
        const userHasPermissionWorkspace = checkUserPermission(rolesWithPermission, allWorkspaceIam.bindings);

        const newUserGroups: SetStateAction<never[]> = [];
        allGroups.groups.map((group: any, groupIndex: number) => {
            if (group.members.some((m) => m.member.includes(user))) {
                newUserGroups.push(group.name);
            }
        }) 
        setUserGroups(newUserGroups);

        if (userHasPermissionWorkspace.hasPermission) {
          //  console.log("!!!!!!!!!!!!!User has permission for the whole workspace:",userHasPermissionWorkspace);
            for (const project of allProjects) {
                const fetchedDatabases = await fetch(`/api/databases/${encodeURIComponent(project.name)}`, {
                    method: 'GET'
                });
                const fetchedDatabasesData = await fetchedDatabases.json();
                newDatabasesWithPermission.push({project: project.name, databases: fetchedDatabasesData.databases});
            }

        } else {
           // console.log("User does not have permission for the whole workspace, let's check the project iam");
            for (const project of allProjects) {
                const projectShort = project.name.split("/")[1];
                const fetchedProjectIam = await fetch(`/api/projectiam/${encodeURIComponent(projectShort)}`, {
                    method: 'GET'
                });
                const fetchedProjectIamData = await fetchedProjectIam.json();
    
                const userHasPermissionProject = checkUserPermission(rolesWithPermission, fetchedProjectIamData.bindings, userGroups.length > 0, project.name);
                if (userHasPermissionProject.hasPermission) { // we should check if the permission is for databases only
                   // console.log("User has permission for the project:", project.name);
                    const fetchedDatabases = await fetch(`/api/databases/${encodeURIComponent(project.name)}`, {
                        method: 'GET'
                    });
                    const fetchedDatabasesData = await fetchedDatabases.json();
                    newDatabasesWithPermission.push({project: project.name, databases: fetchedDatabasesData.databases});
                  
                } else {
                    if (userHasPermissionProject.onlyDatabase && userHasPermissionProject.onlyDatabase != '') {
                     //   console.log("userHasPermissionProject.onlyDatabase=======================", {project: project.name, databases: [userHasPermissionProject.onlyDatabase]})
                        newDatabasesWithPermission.push({project: project.name, databases: [{name: userHasPermissionProject.onlyDatabase}]});
                    }
                }
            }
        }

        setDatabasesWithPermission(newDatabasesWithPermission);
    }

    const checkUserPermission = (roles: any[], bindings: any[], hasGroups: boolean = false, theProject: string = ''): { hasPermission: boolean, onlyDatabase: string } => {
    
        for (const binding of bindings) {
            if (!roles.some(role => role.name === binding.role)) continue;
    
            const memberMatch = binding.members.includes(`user:${user}`);
            const groupMatch = hasGroups && userGroups.some(group => 
                binding.members.includes(group.replace('groups/', 'group:'))
            );
    
            if (memberMatch || groupMatch) {
                if (theProject !== '') {
                    return checkProjectSpecificPermission(binding);
                }
                return { hasPermission: true, onlyDatabase: '' };
            }
        }
    
        return { hasPermission: false, onlyDatabase: '' };
    };
    
    const checkProjectSpecificPermission = (binding: any): { hasPermission: boolean, onlyDatabase: string } => {
        if (!binding.condition || !binding.condition.expression) {
            return { hasPermission: true, onlyDatabase: '' };
        }
    
        const { expression } = binding.condition;
        const databaseMatch = expression.match(/resource\.database\s+in\s+\["([^"]+)"\]/);
        const timestampMatch = expression.match(/request\.time\s*<\s*timestamp\("([^"]+)"\)/);
    
        if (!databaseMatch) {
            return { hasPermission: true, onlyDatabase: '' };
        }
    
        if (timestampMatch) {
            const expirationTime = new Date(timestampMatch[1]);
            if (new Date() >= expirationTime) {
                return { hasPermission: false, onlyDatabase: '' };
            }
        }
    
        return { hasPermission: false, onlyDatabase: databaseMatch[1] };
    };


    return (
        <form onSubmit={handleSubmit}  className="md:w-1/2 sm:w-full flex gap-3 flex-col p-10 border-green-600 border-4">        
        <h1 className="text-2xl font-bold">Which databases does a specific user have access to?</h1>  

        <select 
                className="p-2 border rounded"
                value={user}
                onChange={(e) => handleSelectUser(e)}
            >
                <option value="">-- Select a user --</option>
                {allUsers.map(user => (
                    <option key={user.name} value={user.email}>{user.email}</option>
                ))}
            </select>


        {userGroups.length > 0 && (
            <div>
                <strong>The user also belongs to groups:</strong>
                <ul>
                {userGroups.map((group, index) => {
                    return (
                        <li key={index}>{group}</li>
                    )
                })}
                </ul>
            </div>
        )}

        <select name="permission" id="permission" value={permission} onChange={(e) => handleSelectPermission(e)}
        className="w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
        <option value="">-- Please select a permission --</option>
        {allDatabasePermissions.map((itemadp, indexadp) => {
            return  <option key={indexadp} value={itemadp}>{itemadp}</option>
        })}
        </select>

        {databasesWithPermission.length > 0 && (
        databasesWithPermission.map((item) => (
            <div key={item.project} className="mt-4">
            <h3 className="font-semibold text-lg">{item.project}</h3>
            {item.databases.length > 0 && (
                <ul className="list-disc pl-5 mt-2">
                {item.databases.map((db) => (
                    <li key={db.name}>{db.name}</li>
                ))}
                </ul>
            ) }
            </div>
            ))
            )}

        </form>
    )
}