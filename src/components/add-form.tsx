"use client";

import { useState } from "react";
import { v4 } from "uuid";

export default function AddForm(props) {

    const [SQL, setSQL] = useState('');
    const [project, setProject] = useState('');
    const [createdIssueUID, setCreatedIssueUID] = useState('');
    const [database, setDatabase] = useState('');
    const [databases, setDatabases] = useState([]);

    const allprojects = props['allprojects']
    const alldatabases = props['alldbs']

    const handleSelectProject = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setProject(e.target.value);
        setDatabases(alldatabases.filter((item) => item.project === e.target.value));
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
        console.log(createdPlanData.name);


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
            "assignee": "users/support@bytebase.com",
            "plan": createdPlanData.name
        }

        const createdIssue = await fetch('/api/issues/'+encodeURIComponent(project), {
            method: 'POST',
            body:JSON.stringify(newIssue)
        });
     
        const createdIssueData = await createdIssue.json();

        console.log("--------- createdIssueData uid ----------");
        console.log(createdIssueData.uid);
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

        console.log("--------- createdRollout ----------");
        console.log(createdRolloutData);

    }

    return (
        <form onSubmit={handleSubmit} className="flex gap-3 flex-col">
        
        <select name="project" id="project" value={project} onChange={(e) => handleSelectProject(e)}
        className="lock w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
        <option value="">-- Please select a project --</option>
        {allprojects.map((item, index) => {
                if (item.name === 'projects/default') {
                    return ;
                }
                return <option key={index} value={item.name}>{item.title}:{item.name}</option>
        })}
        </select>

        <select name="database" id="database" value={database} onChange={(e) => setDatabase(e.target.value)}
        className="lock w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
        <option value="">-- Please select a database --</option>
        {databases.map((item, index) => {
            return  <option key={index} value={item.name}>{item.name}</option>
        })}
        </select>
        <textarea name="sql" 
        className="lock w-full rounded-md  border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            cols={20} rows={3} 
            onChange={e => setSQL(e.target.value)}
            value={SQL} placeholder="Input your SQL here, e.g. ALTER TABLE ..." />

          <button type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Create New Issue</button>

        {createdIssueUID && <a href={"https://demo.bytebase.com/issue/"+createdIssueUID} target="_blank"
        className="text-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">View Created Issue {createdIssueUID }</a>}

        </form>
        
    )
}
