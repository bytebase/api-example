import { fetchData, generateToken } from "@/app/api/utils";
import FilterAuditLogForm from "@/components/filter-audit-log-form";


export default async function Home() {

  const token = await generateToken();

  /* Fetch all projects */ 
  const allProjectData = await fetchData(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/projects`, token);

  return (
    <div className="grid items-center justify-items-center p-5">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <FilterAuditLogForm allProjects={allProjectData.projects} />
      </main>
    </div>
  );
}
