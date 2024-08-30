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
        console.log("enter updateDatabasesWithPermission ===================")

        const newDatabasesWithPermission: Array<{project: string, databases: any[]}> = [];

        console.log("before rolesWithPermission ------------------")
        console.log("permission", permission)
        console.log("allRoles", allRoles)

        const rolesWithPermission = allRoles.filter((role) => role.permissions.includes(permission));

        console.log("after rolesWithPermission ------------------", rolesWithPermission)

        const userHasPermissionWorkspace = checkUserPermission(rolesWithPermission, allWorkspaceIam.bindings);

        const newUserGroups: SetStateAction<never[]> = [];

        allGroups.groups.map((group: any, groupIndex: number) => {
            if (group.members.some((m) => m.member.includes(user))) {
                newUserGroups.push(group.name);
            }
        }) 
        setUserGroups(newUserGroups);

        if (userHasPermissionWorkspace.hasPermission) {
            console.log("!!!!!!!!!!!!!User has permission for the whole workspace:",userHasPermissionWorkspace);
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
    
                const userHasPermissionProject = checkUserPermission(rolesWithPermission, fetchedProjectIamData.bindings, userGroups.length > 0, project.name);
                if (userHasPermissionProject.hasPermission) { // we should check if the permission is for databases only
                    console.log("User has permission for the project:", project.name);
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
        let hasPermission = false;
        let onlyDatabase = '';

        if (roles.length === 0 || bindings.length === 0) {
            return { hasPermission: false, onlyDatabase: '' };
        }
        
        for (const role of roles) {
            for (const binding of bindings) {
                const roleMatch = binding.role === role.name;
                const memberMatch = binding.members.includes(`user:${user}`);
                let groupMatch = false;
    
                if (roleMatch && hasGroups) {
                    for (const groupName of userGroups) {
                        console.log("user group:", groupName);
                        if (binding.members.includes(groupName.replace('groups/', 'group:'))) {
                            groupMatch = true;
                            break; // Exit the loop once a match is found
                        }
                    }
                }
                //console.log("before check theproject!==''", theProject !== '')
                if (roleMatch && (memberMatch || groupMatch) && theProject !== '') {

                    // when the project is not empty, it might be that the permission is only for a specific database in that project
                    if (binding.condition && binding.condition.expression) {

                        let conditionMatch = true;
                       // console.log("binding.condition.expression", binding.condition.expression)
                       // console.log("binding", binding)
                        const databaseMatch = binding.condition.expression.match(/resource\.database\s+in\s+\["([^"]+)"\]/);
                        const timestampMatch = binding.condition.expression.match(/request\.time\s*<\s*timestamp\("([^"]+)"\)/);
    
                        if (databaseMatch) {

                            conditionMatch = true;
    
                            if (timestampMatch) {
                                const expirationTime = new Date(timestampMatch[1]);
                                const currentTime = new Date();
                                conditionMatch = currentTime < expirationTime;
                            }

                            if (conditionMatch) {
                                onlyDatabase = databaseMatch[1];
                            } else {
                                onlyDatabase = '';
                            }
                        }
                    }
                    break;
                } else {

                    if (roleMatch && (memberMatch || groupMatch)) {
                        hasPermission = true;
                        break;
                }
                }
            }
        }
    
      //  console.log("before return", { 'hasPermission': hasPermission && onlyDatabase === '', 'onlyDatabase': onlyDatabase })
        return { 'hasPermission': hasPermission && onlyDatabase === '', 'onlyDatabase': onlyDatabase };
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