"use client"

import { SetStateAction, useEffect, useState } from "react";
import { parseCelExpression } from './celutils';

export default function FetchUserPermissionForm({ allUsers, allDatabasePermissions, allProjects, allWorkspaceIam, allRoles, allGroups }) {

    const [userGroups, setUserGroups] = useState([])
    const [user, setUser] = useState('')
    const [permission, setPermission] = useState('')
    const [userHasFullWorkspacePermission, setUserHasFullWorkspacePermission] = useState(false);
    const [projectsWithFullPermission, setProjectsWithFullPermission] = useState<Array<string>>([])
    const [databasesWithConditionalPermission, setDatabasesWithConditionalPermission] = useState<Array<{project: string, databases: any[]}>>([])

    const handleSubmit = (e) => { e.preventDefault();}
    const handleSelectUser = (e) => {setUser(e.target.value); setPermission('')};
    const handleSelectPermission = (e) => { setPermission(e.target.value); };

    useEffect(() => {
        if (user || permission) {
            updateDatabasesWithPermission();
        }
    }, [user, permission]);

    const hasUserWorkspacePermission = (rolesWithPermission: any[], rolesToBeMatched: any[]): boolean => {
        
        // There's no to be matched role
        if (rolesToBeMatched.length === 0) {  return false; } 

        for (const roleToBeMatched of rolesToBeMatched) {
            const matchingRole = rolesWithPermission.find(roleWithPermission => roleWithPermission.name === roleToBeMatched.role);
            
            if (!matchingRole) continue;
            
            if (roleToBeMatched.members.includes(`user:${user}`)) {
                return true;
            }
        }
        
        return false;
    };

    const getUserProjectPermissionRoles = (rolesWithPermission: any[], rolesToBeMatched: any[], hasGroups: boolean = false, theProject: string = ''): any[] => {
        
        let refinedRolesToBeMatched: any[] = [];
        let rolesMatched:any[] = [];

        for (const roleToBeMatched of rolesToBeMatched) {
           // console.log("roleToBeMatched: ", roleToBeMatched)
    
            const matchingRole = rolesWithPermission.find(roleWithPermission => roleWithPermission.name === roleToBeMatched.role);
            if (matchingRole) {  // console.log("Matching role found:", matchingRole.name);
                refinedRolesToBeMatched.push(roleToBeMatched);
            } else { //  console.log("No matching role found. ", roleToBeMatched.role);
                continue;
            }
        }
    
        for (const roleToBeMatched of refinedRolesToBeMatched) {
            const memberMatch = roleToBeMatched.members.includes(`user:${user}`);
            const groupMatch = hasGroups && userGroups.some(group => 
                roleToBeMatched.members.includes(group.replace('groups/', 'group:'))
            );
    
            if (memberMatch || groupMatch) {

              //  console.log("Matched !!!roleToBeMatched matched================= ", roleToBeMatched, theProject)
                rolesMatched.push(roleToBeMatched);
            }
        }
    
        return rolesMatched;  
    };



    const updateDatabasesWithPermission = async () => {
        setDatabasesWithConditionalPermission([]);
        setUserHasFullWorkspacePermission(false);
        setProjectsWithFullPermission([]);

        if (!user || !permission) { return; }

        const newProjectsWithFullPermission: Array<string> = [];
        const newDatabasesWithConditionalPermission: Array<{project: string, databases: any[]}> = [];
        let userHasFullWorkspacePermission = false;

        const rolesWithPermission = allRoles.filter((role) => role.permissions.includes(permission));

        const newUserGroups: SetStateAction<never[]> = [];
        allGroups.groups.map((group: any, groupIndex: number) => {
            if (group.members.some((m) => m.member.includes(user))) {
                newUserGroups.push(group.name);
            }
        }) 
        setUserGroups(newUserGroups);

        if (hasUserWorkspacePermission(rolesWithPermission, allWorkspaceIam.bindings)) {
            //TODO the user has workspace permission
            userHasFullWorkspacePermission = true;
        } 
        
        for (const project of allProjects) {
            const projectShort = project.name.split("/")[1];
            const fetchedProjectIam = await fetch(`/api/projectiam/${encodeURIComponent(projectShort)}`, {
                method: 'GET'
            });
            const fetchedProjectIamData = await fetchedProjectIam.json();
            const userHasMatchedRoles = getUserProjectPermissionRoles(rolesWithPermission, fetchedProjectIamData.bindings, userGroups.length > 0, project.name);

            let celsConverted: any[] = [];
            let userHasFullProjectPermission = false; // if there's no condition role which means it has full permission

            if (userHasMatchedRoles.length > 0) {

                for (const role of userHasMatchedRoles) {

                    if (role.condition && role.condition.expression === '') {
                        userHasFullProjectPermission = true;
                    } else {
                        const celValue = await parseCelExpression(role.condition.expression);
                        celsConverted.push(celValue);
                    }
                }

                if (userHasFullProjectPermission) {
                    newProjectsWithFullPermission.push(project.name);
                } 
                
                if (celsConverted.length > 0) {
                    newDatabasesWithConditionalPermission.push({project: project.name, databases: celsConverted});
                }
                

            } 
        }

        setUserHasFullWorkspacePermission(userHasFullWorkspacePermission);
        setProjectsWithFullPermission(newProjectsWithFullPermission);
        setDatabasesWithConditionalPermission(newDatabasesWithConditionalPermission);
    }

    return (
        <form onSubmit={handleSubmit} className="md:w-1/2 sm:w-full flex gap-3 flex-col p-10 border-green-600 border-4">        
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
                        {userGroups.map((group, index) => (
                            <li key={index}>{group}</li>
                        ))}
                    </ul>
                </div>
            )}

            <select name="permission" id="permission" value={permission} onChange={(e) => handleSelectPermission(e)}
                className="w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                <option value="">-- Please select a permission --</option>
                {allDatabasePermissions.map((itemadp, indexadp) => (
                    <option key={indexadp} value={itemadp}>{itemadp}</option>
                ))}
            </select>


            <div>
                    <h2 className="text-2xl font-bold mt-4 mb-2">Full Workspace Permission</h2>
            {userHasFullWorkspacePermission ? (
                    <p className="text-blue-500">The user has full permission to the entire workspace.</p>
            ) : (
                    <p className="text-blue-500">The user does not have permission to the entire workspace.</p>
            )}
            </div>
            

<div>
                <h2 className="text-2xl font-bold mt-4 mb-2">Full Project Permission</h2>
                {projectsWithFullPermission.length > 0 ? (
                    <>
                        <p className="text-blue-500">The user has full permission to the following projects:</p>
                        <ul>
                            {projectsWithFullPermission.map((project, index) => (
                                <li key={index}>{project}</li>
                            ))}
                        </ul>
                    </>
                ) : (
                    <p className="text-blue-500">The user does not have full permission to any projects.</p>
                )}
            </div>


            {databasesWithConditionalPermission.length > 0 && (
                <h2 className="text-2xl font-bold mt-4 mb-2">Project Permission with Condition</h2>
            )}

{databasesWithConditionalPermission.map((item, index) => (
    <div key={index} className="db-list">
        <h3 className="text-xl font-bold">{item.project}</h3>
        <ul>
            {item.databases.map((condDb, condIndex) => {
                const isExpired = condDb.expiredTime && new Date(condDb.expiredTime) < new Date();
                return (
                    <li key={condIndex} className={isExpired ? 'line-through text-red-500' : ''}>
                        {condDb.databaseResources.length === 0 ? (
                            <div><strong>Database:</strong> All in this project</div>
                        ) : (
                            condDb.databaseResources.map((resource, resIndex) => (
                                <div key={resIndex} className="mb-2">
                                     {resource.databaseName}
                                                        {resource.schema && (
                                                            <div>
                                                                <strong>> Schema:</strong> {resource.schema}
                                                            </div>
                                                        )}
                                                        {resource.table && (
                                                            <div>
                                                                <strong>>>Table:</strong> {resource.table}
                                                            </div>
                                                        )}
                                </div>
                            ))
                        )}
                        {condDb.expiredTime ? (
                            <div><strong>Expires:</strong> {new Date(condDb.expiredTime).toLocaleString()}</div>
                        ) : (
                            <div>No Expiration</div>
                        )}
                    </li>
                );
            })}
        </ul>
    </div>
))}

            
        </form>
    )
}