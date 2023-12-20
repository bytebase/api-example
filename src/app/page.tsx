import AddIssueForm from '@/components/add-issue-form';
import generateToken from '@/app/api/token';

export default async function Home() {

  const token = await generateToken();

  console.log("token--------------", token)

  /* Fetch all projects */ 
  const allProjectRes = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/projects`, {
    method: "GET",
    headers: {
      "Authorization": 'Bearer '+ token
  }});
  const allProjectData = await allProjectRes.json();

  /* Fetch all databases */
  const allDatabaseRes = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/instances/-/databases`, {
    method: "GET",
    headers: {
      "Authorization": 'Bearer '+ token
  }});
  const allDatabaseData = await allDatabaseRes.json();

  return (
    <main className="flex flex-col w-full p-10 items-center">
      <AddIssueForm allProjects={allProjectData.projects} allDatabases={allDatabaseData.databases} />
    </main>

  )
}