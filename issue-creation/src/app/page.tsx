import AddIssueForm from '@/components/add-issue-form';
import generateToken from '@/app/api/token';

export default async function Home() {

  const token = await generateToken();

  /* Fetch all projects */ 
  const allProjectRes = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/projects`, {
    method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer ' + token
      },
      cache: 'no-store'
    });
  const allProjectData = await allProjectRes.json();

  /* Fetch all databases */
  const allDatabaseRes = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/instances/-/databases`, {
    method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer ' + token
      },
      cache: 'no-store'
    });
  const allDatabaseData = await allDatabaseRes.json();

  console.log("allProjectData--------------", allProjectData)
  console.log("allDatabaseData--------------", allDatabaseData)

  return (
    <main className="flex flex-col w-full p-10 items-center">
      <AddIssueForm allProjects={allProjectData.projects} allDatabases={allDatabaseData.databases} />
    </main>

  )
}