import FetchDbPermissionForm from "@/components/fetch-db-permission-form";
import generateToken from "@/app/api/token";

export default async function Home() {

  const token = await generateToken();

 // console.log("token--------------", token)

   /* Fetch all users&roles in workspace */
   const allWorkspaceIam = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/workspaces/*:getIamPolicy`, {
    method: "GET",
    headers: {
      "Authorization": 'Bearer '+ token
  }});
  const allWorkspaceIamData = await allWorkspaceIam.json();
  console.log("allWorkspaceIamData--------------", allWorkspaceIamData);

  /* Fetch all roles in workspace */
  const allRoles = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/roles`, {
    method: "GET",
    headers: {
      "Authorization": 'Bearer '+ token
  }});
  const allRolesData = await allRoles.json();
  
   // Combine all permissions from roles and remove duplicates
  let allDatabasePermissions = new Set();
   allRolesData.roles.forEach(role => {
     role.permissions.forEach(permission => {
        if (permission.includes("bb.databases")) {
       allDatabasePermissions.add(permission);}
     });
   });
   const allDatabasePermissionsData = Array.from(allDatabasePermissions);
 
  /* Fetch all projects */
  const allProjectRes = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/projects`, {
    method: "GET",
    headers: {
      "Authorization": 'Bearer '+ token
  }});
  const allProjectData = await allProjectRes.json();

 // console.log("allProjectData--------------", allProjectData)


  return (
    <main className="flex flex-col w-full p-10 items-center">
            <FetchDbPermissionForm 
            allProjects={allProjectData.projects}
            allWorkspaceIam={allWorkspaceIamData}
            allRoles={allRolesData.roles}
            allDatabasePermissions={allDatabasePermissionsData} />
    </main>
  );
}
