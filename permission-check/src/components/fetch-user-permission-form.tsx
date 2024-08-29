"use client"

import { SetStateAction, useEffect, useState } from "react";

export default function FetchUserPermissionForm( props ) {

    const users = props['allUsers'];
    const allDatabasePermissions = props['allDatabasePermissions'];
    const allProjects = props['allProjects'];
    const allWorkspaceIam = props['allWorkspaceIam'];
    const allRoles = props['allRoles'];
    const allGroups = props['allGroups']; 

    const [userGroups, setUserGroups] = useState([])
    const [user, setUser] = useState('')
    const [permission, setPermission] = useState('')
    const [databasesWithPermission, setDatabasesWithPermission] = useState<Array<{project: string, databases: any[]}>>([])

    const handleSubmit = (e) => { e.preventDefault();}
    const handleSelectUser = (e) => {setUser(e.target.value);};
    const handleSelectPermission = (e) => { setPermission(e.target.value); };

    const updateDatabasesWithPermission = async () => {

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

        if (userHasPermissionWorkspace) {
            console.log("User has permission for the whole workspace:");
            for (const project of allProjects) {
                const fetchedDatabases = await fetch(`/api/databases/${encodeURIComponent(project.name)}`, {
                    method: 'GET'
                });
                const fetchedDatabasesData = await fetchedDatabases.json();
                newDatabasesWithPermission.push({project: project.name, databases: fetchedDatabasesData.databases});
            }

        } else {
            console.log("User does not have permission for the whole workspace, let's check the project iam");
            for (const project of allProjects) {
                const projectShort = project.name.split("/")[1];
                const fetchedProjectIam = await fetch(`/api/projectiam/${encodeURIComponent(projectShort)}`, {
                    method: 'GET'
                });
                const fetchedProjectIamData = await fetchedProjectIam.json();
    
                const userHasPermissionProject = checkUserPermission(rolesWithPermission, fetchedProjectIamData.bindings, userGroups.length > 0, true);
                if (userHasPermissionProject) {
                    console.log("User has permission for the project:", project.name);
                    const fetchedDatabases = await fetch(`/api/databases/${encodeURIComponent(project.name)}`, {
                        method: 'GET'
                    });
                    const fetchedDatabasesData = await fetchedDatabases.json();
                    newDatabasesWithPermission.push({project: project.name, databases: fetchedDatabasesData.databases});
                }
            }
        }
            setDatabasesWithPermission(newDatabasesWithPermission);
    }

    const checkUserPermission = (roles: any[], bindings: any[], hasGroups: boolean = false, isProject: boolean = false): boolean => {
        
        return roles.some((role) =>
            bindings.some((binding) => {
                const roleMatch = binding.role === role.name;
                const memberMatch = binding.members.includes(`user:${user}`);
                let groupMatch = false;
                if (roleMatch && hasGroups) {
                    userGroups.map((groupName) => {
                        console.log("user group:", groupName);
                        if (binding.members.includes(groupName.replace('groups/', 'group:'))) {
                           groupMatch = true;
                        }
                    })
                } // TODO here we haven't checked the groups
                const conditionMatch = false;// TODO here we don't check the condition expression 
                return roleMatch && (memberMatch || groupMatch);
            })
        );
    }

    useEffect(() => {
        if (permission || user) {
            updateDatabasesWithPermission();
        }
    }, [permission, user]);

    return (
        <form onSubmit={handleSubmit}  className="md:w-1/2 sm:w-full flex gap-3 flex-col p-10 border-green-600 border-4">        
        <h1 className="text-2xl font-bold">Which databases does a specific user have access to?</h1>  

        <select 
                className="p-2 border rounded"
                value={user}
                onChange={(e) => handleSelectUser(e)}
            >
                <option value="">-- Select a user --</option>
                {users.map(user => (
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
        {allDatabasePermissions.map((item, index) => {
            return  <option key={index} value={item}>{item}</option>
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