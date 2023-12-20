"use client";

import { useState } from "react";
import { v4 } from "uuid";
import generateToken from '@/app/api/token';

export default function AddIssueForm( props ) {
    const [project, setProject] = useState('');
    const [filteredDatabases, setFilteredDatabases] = useState([]);
    const [database, setDatabase] = useState('');
    const [SQL, setSQL] = useState('');
    const [createdIssueUID, setCreatedIssueUID] = useState('');
    const [refreshedIssueStatus, setRefreshedIssueStatus] = useState('OPEN');

    const allProjects = props['allProjects']
    const allDatabases = props['allDatabases']

    const handleSelectProject = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setProject(e.target.value);
        setFilteredDatabases(allDatabases.filter((item) => item.project === e.target.value));
    }

    const refreshIssue = async () => {

        const refreshedIssue = await fetch('/api/issues/'+encodeURIComponent(project)+'/'+createdIssueUID, {
            method: 'GET'
        });
     
        const refreshedIssueData = await refreshedIssue.json();
        console.log("--------- refreshedIssueData ----------", refreshedIssueData);
        setRefreshedIssueStatus(refreshedIssueData.status);
    }

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!SQL || !project || !database) return;

        console.log("handleSubmit");
        
        /**
         * Create a sheet
         */
        let newSheet = {
            database: database,
            title: ``,
            content: Buffer.from(SQL).toString('base64'),
            type: `TYPE_SQL`,
            source: `SOURCE_BYTEBASE_ARTIFACT`,
            visibility: `VISIBILITY_PUBLIC`,
        };

        const createdSheet = await fetch('/api/sheets/'+encodeURIComponent(project), {
            method: 'POST',
            body:JSON.stringify(newSheet)
        });

        const createdSheetData = await createdSheet.json();
        console.log("--------- createdSheetData ----------",createdSheetData);

    
         /**
         * Create a plan
         */
        let newPlan = {
            "steps":[
                {
                "specs": [
                    { 
                        "id": v4(),
                        "change_database_config": {
                            "target": database,
                            "type": `MIGRATE`,
                            "sheet": createdSheetData.name
                        }
                    }
                ]}
            ],
            
            "title": `Change database ${database}`,
            "description": "MIGRATE"
        }

        const createdPlan = await fetch('/api/plans/'+encodeURIComponent(project), {
            method: 'POST',
            body:JSON.stringify(newPlan)
        });

        const createdPlanData = await createdPlan.json();
        console.log("--------- createdPlanData ----------",createdPlanData);


        /**
         * Create an issue
         */
        let newIssue = {
            "approvers": [],
            "approvalTemplates": [],
            "subscribers": [],
            "title": `Issue: Change database ${database}`,
            "description": "dddd",
            "type": "DATABASE_CHANGE",
            "assignee": "",
            "plan": createdPlanData.name
        }

        const createdIssue = await fetch('/api/issues/'+encodeURIComponent(project), {
            method: 'POST',
            body:JSON.stringify(newIssue)
        });
     
        const createdIssueData = await createdIssue.json();
        console.log("--------- createdIssueData ----------",createdIssueData);
        setCreatedIssueUID(createdIssueData.uid)

        /**
         * Create a rollout
         */

        let newRollout = {"plan" :createdPlanData.name};

        const createdRollout = await fetch('/api/rollouts/'+encodeURIComponent(project), {
            method: 'POST',
            body:JSON.stringify(newRollout)
        });
     
        const createdRolloutData = await createdRollout.json();
        console.log("--------- createdRollout ----------", createdRolloutData);
    }

    return (
        <form onSubmit={handleSubmit} className="md:w-1/2 sm:w-full flex gap-3 flex-col">

        <div className="text-lg leading-loose font-bold">Add an issue to Bytebase Console</div>
        
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

        <select name="database" id="database" value={database} onChange={(e) => setDatabase(e.target.value)}
        className="w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
        <option value="">-- Please select a database --</option>
        {filteredDatabases.map((item, index) => {
            return  <option key={index} value={item.name}>{item.name}</option>
        })}
        </select>
        <textarea name="sql" 
        className="w-full rounded-md  border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            cols={20} rows={3} 
            onChange={e => setSQL(e.target.value)}
            value={SQL} placeholder="Input your SQL here, e.g. ALTER TABLE ..." />

          <button type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Create New Issue</button>

        {createdIssueUID && 
        
        <div className="flex">
             
            <a href={process.env.NEXT_PUBLIC_BB_HOST+"/issue/"+createdIssueUID} target="_blank"
        className="flex-1 text-left rounded-md px-3 py-2 text-indigo-500 hover:underline">👉 View Issue {createdIssueUID } in Bytebase [{refreshedIssueStatus}]</a>
            <button type="button" onClick={() => refreshIssue(createdIssueUID)}
            className="flex-none rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
             >Refresh Status</button>
       
        </div>
        }
        </form>
        
    )
}
