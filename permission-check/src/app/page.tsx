import { fetchData, generateToken } from "@/app/api/utils";
import DbFetchUserPermissionForm from "@/components/db-fetch-user-permission-form";
import UserFetchDbPermissionForm from "@/components/user-fetch-db-permission-form";

export default async function Home() {

  const token = await generateToken();

  const allWorkspaceIamData = await fetchData(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/workspaces/*:getIamPolicy`, token);
  const allGroupsData = await fetchData(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/groups`, token);
  const allRolesData = await fetchData(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/roles`, token);
  const allProjectData = await fetchData(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/projects`, token);
  const allUsersData = await fetchData(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/users`, token);

 // console.log("allUsersData --------------", allUsersData.users)
  
   // Combine all permissions from roles and remove duplicates
  const allDatabasePermissions = new Set(
    allRolesData.roles.flatMap(role =>
      role.permissions.filter(permission => permission.includes("bb.databases"))
    )
  );
  const allDatabasePermissionsData = Array.from(allDatabasePermissions);

  return (
    <main className="flex flex-row w-full p-10 items-start">
            <DbFetchUserPermissionForm
            allProjects={allProjectData.projects}
            allWorkspaceIam={allWorkspaceIamData}
            allRoles={allRolesData.roles}
            allDatabasePermissions={allDatabasePermissionsData}
            allGroups={allGroupsData}
            />
            <UserFetchDbPermissionForm 
            allUsers={allUsersData.users}
            allDatabasePermissions={allDatabasePermissionsData}
            allProjects={allProjectData.projects}
            allWorkspaceIam={allWorkspaceIamData}
            allRoles={allRolesData.roles}
            allGroups={allGroupsData}
            />
    </main>
  );
}
