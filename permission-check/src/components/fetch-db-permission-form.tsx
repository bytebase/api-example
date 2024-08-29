"use client"

import { useEffect, useState } from "react";

export default function FetchDbPermissionForm( props ) {
    
    const allProjects = props['allProjects']
    const allWorkspaceIam = props['allWorkspaceIam']
    const allRoles = props['allRoles']
    const allDatabasePermissions = props['allDatabasePermissions']
    const allGroups = props['allGroups']

    const [project, setProject] = useState('');
    const [filteredDatabases, setFilteredDatabases] = useState([])
    const [database, setDatabase] = useState('')
    const [projectIam, setProjectIam] = useState([])
    const [workspaceIam, setWorkspaceIam] = useState([])
    const [permission, setPermission] = useState('')
    const [rolesWithPermission, setRolesWithPermission] = useState([])
    const [membersWithPermission, setMembersWithPermission] = useState([])

    const handleSelectProject = async (e:React.ChangeEvent<HTMLSelectElement>) => {
        console.log("handleSelectProject projectValue:", e.target.value);

        const projectValue = e.target.value
        setProject(projectValue);
        // projectValue e.g.: projects/project-sample
        // fetch databases
        const fetchedDatabases = await fetch(`/api/databases/${encodeURIComponent(projectValue)}`,{
            method: 'GET'
        })
        const fetchedDatabasesData = await fetchedDatabases.json()
        setFilteredDatabases(fetchedDatabasesData.databases)

        // fetch project iam
        const projectShort = projectValue.split("/")[1]
        const fetchedProjectIam = await fetch(`/api/projectiam/${encodeURIComponent(projectShort)}`,{
            method: 'GET'
        })
     
        const fetchedProjectIamData = await fetchedProjectIam.json()
        setProjectIam(fetchedProjectIamData.bindings)
        setWorkspaceIam(allWorkspaceIam.bindings)
    }

    const handleSelectPermission = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPermission(e.target.value);
    };

    const handleSelectDatabase = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDatabase(e.target.value);
    };

    useEffect(() => {
        if (permission || database) {
            updateMembersWithPermission();
        }
    }, [permission, database]);

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    const updateMembersWithPermission = () => {
        // find all roles that have the permission
        const rolesWithPermission = allRoles.filter((role) => {
            return role.permissions.includes(permission)
        })
        setRolesWithPermission(rolesWithPermission)

        // find all members with roles that have the permission
        const membersWithPermission = [
            ...projectIam,
            ...workspaceIam
        ].filter((iam) => {
            const hasPermission = rolesWithPermission.some((role: any) => role.name === iam.role);
            
            if (hasPermission) {
                if (!iam.condition.expression || iam.condition.expression.includes(database)) {
                    console.log("database includes iam.condition.expression or there is no condition");
                    return true;
                }
            }
            return false;

        }).flatMap(iam => iam.members)
        setMembersWithPermission(membersWithPermission)
    }

    return (
        <form onSubmit={handleSubmit}  className="md:w-1/2 sm:w-full flex gap-3 flex-col">                    
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
        
        {/*<div className="flex flex-col">

        <div>
        <strong>Project IAM</strong>
        {projectIam.map((item, index) => {
            return <div key={index}>
                {item.role}

                {item.members.map((member, index) => {
                    return <div key={index}>
                        {member}
                    </div>
                })}

                </div>
        })}
        </div>

        <div>
        <strong>Workspace IAM</strong>
        {workspaceIam.map((item, index) => {
            return <div key={index}>
                {item.role}

                {item.members.map((member, index) => {
                    return <div key={index}>
                        {member}
                    </div>
                })}

                </div>
        })}
        </div>
        </div>
        */}

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
            <strong>Roles with permission</strong>
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
            <strong>Members with permission</strong>
            <ul>
                {membersWithPermission.map((item, index) => (
                    <li key={index}>
                    {item}
                    {typeof item === 'string' && item.startsWith('group:') && (
                        allGroups.groups.map((group: any, groupIndex: number) => {
                            const replacedItem = (item as string).replace('group:', 'groups/');
                            if (group.name === replacedItem) {
                                return (
                                <ul key={groupIndex} className="bg-gray-100 p-2 rounded-md">
                                    <strong>This group includes these members:</strong>
                                    {group.members.map((m: any, i: number) => (
                                        <li key={i}>{m.member}</li>
                                    ))}
                                </ul>
                                );
                            }
                        })
                    )}
                </li>
                ))}
            </ul>
            </div>
        )}
        </form>
    )
}