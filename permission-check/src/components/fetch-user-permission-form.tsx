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

    const hasUserWorkspacePermission = (rolesWithPermission: any[], rolesToBeMatched: any[]): boolean => {

        if (rolesToBeMatched.length === 0) {            // There's no to be matched role
                return false;
        } else {

            for (const roleToBeMatched of rolesToBeMatched) {

             //   console.log("roleToBeMatched: ", roleToBeMatched)
    
                if (!rolesWithPermission.find(roleWithPermission => roleWithPermission.name === roleToBeMatched.role)) continue;
                
                const memberMatch = roleToBeMatched.members.includes(`user:${user}`);
    
    
                if (memberMatch) {
                //    console.log("workspace Matched !!!")
                    return true;
                } else {
                    return false;
                }
            }
        }     
    };

    const getUserProjectPermissionRoles = (rolesWithPermission: any[], rolesToBeMatched: any[], hasGroups: boolean = false, theProject: string = ''): any[] => {
        
        let refinedRolesToBeMatched: any[] = [];
        let rolesMatched:any[] = [];

        for (const roleToBeMatched of rolesToBeMatched) {
           // console.log("roleToBeMatched: ", roleToBeMatched)
    
            const matchingRole = rolesWithPermission.find(roleWithPermission => roleWithPermission.name === roleToBeMatched.role);
            if (matchingRole) {
               // console.log("Matching role found:", matchingRole.name);
                refinedRolesToBeMatched.push(roleToBeMatched);
            } else {
              //  console.log("No matching role found. ", roleToBeMatched.role);
                continue;
            }
        }
    
        for (const roleToBeMatched of refinedRolesToBeMatched) {
            const memberMatch = roleToBeMatched.members.includes(`user:${user}`);
            const groupMatch = hasGroups && userGroups.some(group => 
                roleToBeMatched.members.includes(group.replace('groups/', 'group:'))
            );
    
            if (memberMatch || groupMatch) {

            //    console.log("Matched !!!roleToBeMatched matched================= ", roleToBeMatched, theProject)
                rolesMatched.push(roleToBeMatched);
            }
        }
    
        return rolesMatched;  
    };


    const parseCelExpression = async (celExpression: string): Promise<any> => {

        console.log("celExpression =============== ", celExpression)
        const response = await fetch(`/api/cel`, {
            method: 'POST',
            body: JSON.stringify({
                expressions: [celExpression]
            })
        });
        const data = await response.json();
        console.log("celExpression parse data =============== ", data)
        return data;
    };

    //e.g  1 "request.time < timestamp("2024-09-07T08:42:34.153Z") && (resource.database in ["instances/prod-sample-instance/databases/hr_prod"])"
    //e.g  2 "request.time < timestamp(\"2024-12-03T08:42:48.668Z\") && (resource.database in [\"instances/prod-sample-instance/databases/hr_prod\",\"instances/test-sample-instance/databases/hr_test\"])"
    //e.g  3 "request.time < timestamp(\"2024-10-05T07:35:51.445Z\")"
    //e.g  4 "(resource.database == \"instances/prod-sample-instance/databases/hr_prod\" && resource.schema == \"bbdataarchive\" && resource.table in [\"_20240904030038_0_t1\"])"
    //e.g  5 "request.time < timestamp("2024-10-05T09:03:41.349Z") && ((resource.database == "instances/test-sample-instance/databases/hr_test" && resource.schema in ["bbdataarchive"]) || (resource.database == "instances/prod-sample-instance/databases/hr_prod" && resource.schema == "public" && resource.table in ["employee","dept_emp"]) || (resource.database == "instances/test-sample-instance/databases/hr_test" && resource.schema == "public" && resource.table in ["title"]))"
    //e.g  6 "(resource.database in ["instances/test-sample-instance/databases/hr_test", "instances/prod-sample-instance/databases/hr_prod"])"
   /* const parseCelExpression = (celExpression: string): {
        isExpired: boolean,
        expiredDate: string | null,
        resources: Array<{
            databases: string[],
            schemas: string[],
            tables: string[]
        }>
    } => {
    
        const result = {
            isExpired: false,
            expiredDate: null,
            resources: []
        };
        let resourceConditions = '';
    
        // Check for expiration
        const timeMatch = celExpression.match(/request\.time\s*<\s*timestamp\("(.+?)"\)/);
        if (timeMatch) {
            const expirationTime = new Date(timeMatch[1]);
            result.expiredDate = expirationTime.toISOString();
            result.isExpired = new Date() >= expirationTime;
            resourceConditions = celExpression.split('&&').slice(1).join('&&').trim();
        } else {
            resourceConditions = celExpression.trim();
        }

        // Remove outer parentheses and split by OR
        const orConditions = resourceConditions.replace(/^\(|\)$/g, '').split('||').map(c => c.trim());
    
        orConditions.forEach(condition => {
            const resource: { databases: string[]; schemas: string[]; tables: string[] } = { databases: [], schemas: [], tables: [] };
            
            // Extract database
            const databaseMatches = [...condition.matchAll(/resource\.database\s*(==|in)\s*(\["[^"]+?"(?:,\s*"[^"]+?")*\]|"[^"]+")/g)];
            databaseMatches.forEach(match => {
                const databases = match[2]
                    .replace(/[\[\]]/g, '')
                    .split(',')
                    .map(s => s.trim().replace(/^"|"$/g, ''))
                    .filter(s => s !== '');
                resource.databases.push(...databases);
            });
    
            // Extract schemas
            const schemaMatches = [...condition.matchAll(/resource\.schema\s*(==|in)\s*(\["[^"]+?"(?:,\s*"[^"]+?")*\]|"[^"]+")/g)];
            schemaMatches.forEach(match => {
                const schemas = match[2]
                    .replace(/[\[\]]/g, '')
                    .split(',')
                    .map(s => s.trim().replace(/^"|"$/g, ''))
                    .filter(s => s !== '');
                resource.schemas.push(...schemas);
            });
    
            // Extract tables
            const tableMatches = [...condition.matchAll(/resource\.table\s*(==|in)\s*(\["[^"]+?"(?:,\s*"[^"]+?")*\]|"[^"]+")/g)];
            tableMatches.forEach(match => {
                const tables = match[2]
                    .replace(/[\[\]]/g, '')
                    .split(',')
                    .map(s => s.trim().replace(/^"|"$/g, ''))
                    .filter(s => s !== '');
                resource.tables.push(...tables);
            });
    
            if (resource.databases.length > 0) {
                result.resources.push(resource);
            }
        });
    
        console.log("Parse CEL <<<<<<<<<<<<<<<<<<<<<<<<<<", celExpression);
        console.log("Parsed result=============>>>>>>>>>>", result);
        return result;
    };*/
    

    const updateDatabasesWithPermission = async () => {
        if (!user || !permission) { return; }

        const newDatabasesWithPermission: Array<{project: string, databases: any[]}> = [];

        const rolesWithPermission = allRoles.filter((role) => role.permissions.includes(permission));

        const newUserGroups: SetStateAction<never[]> = [];
        allGroups.groups.map((group: any, groupIndex: number) => {
            if (group.members.some((m) => m.member.includes(user))) {
                newUserGroups.push(group.name);
            }
        }) 
        setUserGroups(newUserGroups);

        if (hasUserWorkspacePermission(rolesWithPermission, allWorkspaceIam.bindings)) {
            for (const project of allProjects) { // list all projects and get all databases
                const fetchedDatabases = await fetch(`/api/databases/${encodeURIComponent(project.name)}`, {
                    method: 'GET'
                });
                const fetchedDatabasesData = await fetchedDatabases.json();
                newDatabasesWithPermission.push({project: project.name, databases: fetchedDatabasesData.databases});
            }
        } else {
            console.log("NO workspace permission matched, let's check project permission =================================")
            for (const project of allProjects) {
                const projectShort = project.name.split("/")[1];
                const fetchedProjectIam = await fetch(`/api/projectiam/${encodeURIComponent(projectShort)}`, {
                    method: 'GET'
                });
                const fetchedProjectIamData = await fetchedProjectIam.json();
    
                const userHasMatchedRoles = getUserProjectPermissionRoles(rolesWithPermission, fetchedProjectIamData.bindings, userGroups.length > 0, project.name);

                let celsConverted: any[] = [];

                if (userHasMatchedRoles.length > 0) {
                    let shouldDisplayAllDatabases = false;

                    for (const role of userHasMatchedRoles) {

                     //   console.log("role ", role.condition)
                        if (role.condition && role.condition.expression === '') {
                            shouldDisplayAllDatabases = true;
                        } else {
                           // const parsedCel = parseCelExpression(role.condition.expression);
                           // celsConverted.push(parsedCel);
                           parseCelExpression(role.condition.expression);
                        }
                    }

                   // console.log("celsConverted +++++++++++++++++++++++++++++++++++++++++++++++++", celsConverted);


                    const fetchedDatabases = await fetch(`/api/databases/${encodeURIComponent(project.name)}`, {
                        method: 'GET'
                    });
                    const fetchedDatabasesData = await fetchedDatabases.json();
                    const projectAllDatabases = fetchedDatabasesData.databases;
            
                 //   console.log("projectAllDatabases =================", projectAllDatabases);


                    for ( const cel of celsConverted ){
                        console.log(cel)
                    }

                } 

              /*  if (userHasPermissionProject.hasFullPermission) {
                    const fetchedDatabases = await fetch(`/api/databases/${encodeURIComponent(project.name)}`, {
                        method: 'GET'
                    });
                    const fetchedDatabasesData = await fetchedDatabases.json();
                    newDatabasesWithPermission.push({project: project.name, databases: fetchedDatabasesData.databases});
                } else {
                    console.log("userHasPermissionProject ++++++++++++++++++ ", userHasPermissionProject)
                }*/
            }
        }

        console.log("newDatabasesWithPermission ", newDatabasesWithPermission)
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

 
    

    const checkProjectSpecificCondition = (roleToBeMatched: any): { hasFullPermission: boolean, theCondition: string } => {
        
       // console.log("checkProjectSpecificCondition ================= ", roleToBeMatched)

        if (roleToBeMatched.condition && roleToBeMatched.condition.expression) {
          //  console.log("roleToBeMatched.condition && roleToBeMatched.condition.expression -----", roleToBeMatched.condition.expression)
            return { hasFullPermission: false, theCondition: roleToBeMatched.condition.expression };
        } 

        return { hasFullPermission: true, theCondition: '' };
/*
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

        return { hasPermission: false, onlyDatabase: databaseMatch[1], extraCondition };*/
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