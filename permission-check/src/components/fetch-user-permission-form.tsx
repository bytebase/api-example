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
        if (!user || !permission) {
            return;
        }

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
            for (const project of allProjects) {
                const fetchedDatabases = await fetch(`/api/databases/${encodeURIComponent(project.name)}`, {
                    method: 'GET'
                });
                const fetchedDatabasesData = await fetchedDatabases.json();
                newDatabasesWithPermission.push({project: project.name, databases: fetchedDatabasesData.databases});
            }
        } else {
            for (const project of allProjects) {
                const projectShort = project.name.split("/")[1];
                const fetchedProjectIam = await fetch(`/api/projectiam/${encodeURIComponent(projectShort)}`, {
                    method: 'GET'
                });
                const fetchedProjectIamData = await fetchedProjectIam.json();
    
                const userHasPermissionProject = checkUserPermission(rolesWithPermission, fetchedProjectIamData.bindings, userGroups.length > 0, project.name);
                if (userHasPermissionProject.hasPermission) {
                    const fetchedDatabases = await fetch(`/api/databases/${encodeURIComponent(project.name)}`, {
                        method: 'GET'
                    });
                    const fetchedDatabasesData = await fetchedDatabases.json();
                    newDatabasesWithPermission.push({project: project.name, databases: fetchedDatabasesData.databases});
                } else {
                    if (userHasPermissionProject.onlyDatabase && userHasPermissionProject.onlyDatabase.length > 0) {
                        userHasPermissionProject.onlyDatabase.forEach((db, index) => {
                            const extraCondition = userHasPermissionProject.extraConditions[index];
                            if (extraCondition) {
                                newDatabasesWithPermission.push({project: project.name, databases: [{name: db, extraConditionTime: extraCondition.expireTime, extraConditionIsExpired: extraCondition.isExpired}]});
                            } else {
                                newDatabasesWithPermission.push({project: project.name, databases: [{name: db}]});
                            }
                        });
                    }
                }
            }
        }

        console.log("newDatabasesWithPermission ================= ", newDatabasesWithPermission)
        setDatabasesWithPermission(newDatabasesWithPermission);
    };

    // Group databases by project
    const groupedDatabases = databasesWithPermission.reduce((acc, item) => {
        if (!acc[item.project]) {
            acc[item.project] = [];
        }
        acc[item.project].push(...item.databases);
        return acc;
    }, {});

    const checkUserPermission = (rolesWithPermission: any[], rolesToBeMatched: any[], hasGroups: boolean = false, theProject: string = ''): { hasPermission: boolean, onlyDatabase: string[], extraConditions: {}[] } => {
        let hasPermission = false;
        let onlyDatabases: string[] = [];
        let extraConditions: {}[] = [];

        console.log("rolesWithPermission ================= ", rolesWithPermission)
        console.log("rolesToBeMatched ================= ", rolesToBeMatched)
        console.log("hasGroups ================= ", hasGroups)
        console.log("theProject ================= ", theProject)

        for (const roleToBeMatched of rolesToBeMatched) {
            if (!rolesWithPermission.some(roleWithPermission => roleWithPermission.name === roleToBeMatched.role)) continue;

            const memberMatch = roleToBeMatched.members.includes(`user:${user}`);
            const groupMatch = hasGroups && userGroups.some(group => 
                roleToBeMatched.members.includes(group.replace('groups/', 'group:'))
            );

            if (memberMatch || groupMatch) {
                if (theProject !== '') {
                    const projectPermission = checkProjectSpecificPermission(roleToBeMatched);
                    if (projectPermission.hasPermission) {
                        hasPermission = true;
                    }
                    if (projectPermission.onlyDatabase) {
                        onlyDatabases.push(projectPermission.onlyDatabase);
                    }
                    if (projectPermission.extraCondition) {
                        extraConditions.push(projectPermission.extraCondition);
                    }
                } else {
                    hasPermission = true;
                }
            }
        }

        return { hasPermission, onlyDatabase: onlyDatabases, extraConditions };
    };

    const checkProjectSpecificPermission = (roleToBeMatched: any): { hasPermission: boolean, onlyDatabase: string, extraCondition?: {} } => {
        if (!roleToBeMatched.condition || !roleToBeMatched.condition.expression) {
            return { hasPermission: true, onlyDatabase: '', extraCondition: {} };
        }

        const { expression } = roleToBeMatched.condition;
        console.log("expression ================= ", expression)
        const databaseMatch = expression.match(/resource\.database\s+in\s+\["([^"]+)"\]/);
        const timestampMatch = expression.match(/request\.time\s*<\s*timestamp\("([^"]+)"\)/);

        if (!databaseMatch) {
            return { hasPermission: true, onlyDatabase: '', extraCondition: {} };
        }

        let extraCondition: { isExpired?: boolean, expireTime?: string } = { isExpired: false, expireTime: '' };
        let expirationTime: Date | null = null;

        if (timestampMatch) {
            expirationTime = new Date(timestampMatch[1]);
            if (new Date() >= expirationTime) {
                extraCondition = { isExpired: true, expireTime: expirationTime.toString() };
            } else {
                extraCondition = { isExpired: false, expireTime: expirationTime.toString() };
            }
        }

        return { hasPermission: false, onlyDatabase: databaseMatch[1], extraCondition };
    };

    // Sort databasesWithPermission before rendering
    const sortedDatabasesWithPermission = databasesWithPermission.sort((a, b) => {
        if (a.project < b.project) return -1;
        if (a.project > b.project) return 1;
        return 0;
    });

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

            {Object.keys(groupedDatabases).length > 0 && (
                Object.keys(groupedDatabases).map((project) => (
                    <div key={project} className="mt-4">
                        <h3 className="font-semibold text-lg">{project}</h3>
                        <ul className="list-disc pl-5 mt-2">
                            {groupedDatabases[project].map((db, index) => (
                                <li 
                                    key={`${db.name}-${index}`} 
                                    style={{ textDecoration: db.extraConditionIsExpired ? 'line-through' : 'none' }}
                                >
                                    {db.name} {db.extraConditionTime}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            )}
        </form>
    )
}