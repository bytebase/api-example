"use client"

import { useEffect, useState } from "react";
import { parseCelExpression, fetchData } from "./utils";

export default function DbFetchUserPermissionForm({ allProjects, allWorkspaceIam, allRoles, allDatabasePermissions, allGroups }) {

    const [project, setProject] = useState('');
    const [filteredDatabases, setFilteredDatabases] = useState([])
    const [database, setDatabase] = useState('')
    const [projectIam, setProjectIam] = useState([])
    const [workspaceIam, setWorkspaceIam] = useState([])
    const [permission, setPermission] = useState('')

    const [rolesWithPermission, setRolesWithPermission] = useState([])
    const [membersWithPermission, setMembersWithPermission] = useState([])

    const fetchDatabases = (projectValue: string) => fetchData(`/api/databases/${encodeURIComponent(projectValue)}`);
    const fetchProjectIam = (projectShort: string) => fetchData(`/api/projectiam/${encodeURIComponent(projectShort)}`);

    const handleSelectProject = async (e:React.ChangeEvent<HTMLSelectElement>) => {

        const projectValue = e.target.value
        setProject(projectValue);
        setPermission('');
        setDatabase('');
        
        // Fetch databases and project IAM concurrently
        const [fetchedDatabasesData, fetchedProjectIamData] = await Promise.all([
            fetchDatabases(projectValue),
            fetchProjectIam(projectValue.split("/")[1])
        ]);

        setFilteredDatabases(fetchedDatabasesData.databases);
        setProjectIam(fetchedProjectIamData.bindings);
        setWorkspaceIam(allWorkspaceIam.bindings);
    }

    const handleSelectDatabase = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDatabase(e.target.value);
        setPermission('');
    };

    const handleSelectPermission = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPermission(e.target.value);
    };

    useEffect(() => {
        if (permission || database || project) {
            updateMembersWithPermission();
        }
    }, [permission, database, project]);

    const updateMembersWithPermission = async () => {


        if (!project || !permission || !database) { return; }
        // find all roles that have the permission
        const rolesWithPermission = allRoles.filter((role) => role.permissions.includes(permission));
        setRolesWithPermission(rolesWithPermission);
    
        // find all members with roles that have the permission
        const iamList = [...projectIam, ...workspaceIam];
    
        const membersWithPermission = (await Promise.all(iamList.map(async (iam) => {
            const hasPermission = rolesWithPermission.some((role: any) => role.name === iam.role);
            
            if (hasPermission) {
                if (!iam.condition?.expression) {
                    // No condition means no expiredTime, but include member and null for expiredTime
                    return iam.members.map(member => ({ member, expiredTime: null })); 
                }
    
                const celValue = await parseCelExpression(iam.condition.expression);
    
                let expiredTime = celValue.expiredTime;
    
                // Check if any database resource matches the current database
                for (let dbrs of celValue.databaseResources) {
                    if (dbrs.databaseName == database) {
                        // Return the members and expiredTime as an array of objects
                        return iam.members.map(member => ({ member, expiredTime }));
                    }
                }
            }
            return []; // If no match or no permission, return empty array
        }))).flat(); // Flatten the resulting array
    
        // At this point, membersWithPermission will be an array of objects, where each object contains { member, expiredTime }
        setMembersWithPermission(membersWithPermission);
    };

    return (
        <form className="md:w-1/2 sm:w-full flex gap-3 flex-col p-10 border-yellow-600 border-4">        
        <h1 className="text-2xl font-bold">Who has access to a specific database?</h1>            
       
        <select name="project" id="project" value={project} onChange={(e) => handleSelectProject(e)}
        className="w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
        <option value="">-- Please select a project --</option>
        {allProjects.map((item, index) => {
                if (item.name === 'projects/default') {
                    return ;
                }
                return <option key={index} value={item.name}>{item.title}</option>
        })}
        </select>

        <select name="database" id="database" value={database} onChange={(e) => handleSelectDatabase(e)}
        className="w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
        <option value="">-- Please select a database --</option>
        {filteredDatabases.map((item, index) => {
            return  <option key={index} value={item.name}>{item.name}</option>
        })}
        </select>


        <select name="permission" id="permission" value={permission} onChange={(e) => handleSelectPermission(e)}
        className="w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
        <option value="">-- Please select a permission --</option>
        {allDatabasePermissions.map((item, index) => {
            return  <option key={index} value={item}>{item}</option>
        })}
        </select>

        {rolesWithPermission.length > 0 && (
            <div>
            <h2 className="text-2xl font-bold mt-4 mb-2">Roles with permission</h2>
            <ul>
                {rolesWithPermission.map((item, index) => (
                    <li key={index}>
                        {item.title}
                    </li>
                ))}
            </ul>
            </div>
        )}

        {membersWithPermission.length > 0 && (
            <div>
                <h2 className="text-2xl font-bold mt-4 mb-2">Members with permission</h2>
                <ul>
                    {membersWithPermission.map((it, index) => {
                        const item = it.member;
                        const isExpired = it.expiredTime && new Date(it.expiredTime) < new Date();

                        return (
                            <li key={index} className={isExpired ? "line-through text-red-500" : ""}>
                                {item}
                                {typeof item === 'string' && item.startsWith('group:') && 
                                    allGroups.groups.map((group: any, groupIndex: number) => {
                                        const replacedItem = item.replace('group:', 'groups/');
                                        
                                        if (group.name === replacedItem) {
                                            return (
                                                <ul key={groupIndex} className="bg-gray-100 p-2 mt-2 mb-2 rounded-md">
                                                    <strong>This group has these members:</strong>
                                                    {group.members.map((m: any, i: number) => (
                                                        <li key={i}>{m.member}</li>
                                                    ))}
                                                </ul>
                                            );
                                        }
                                        return null; // Safely return null if no match is found
                                    })
                                }

                                <div>
                                    {it.expiredTime ? (
                                        <span>
                                           <strong>Expires:</strong>  {new Date(it.expiredTime).toLocaleString()}
                                        </span>
                                    ) : " No Expiration"}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        )}
        </form>
    )
}