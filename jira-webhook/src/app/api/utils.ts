import { v4 } from 'uuid';

export async function fetchData(url: string, token: string, options: RequestInit = {}) {
    const defaultOptions: RequestInit = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": 'Bearer ' + token
        },
        cache: 'no-store'
    };

    const mergedOptions = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    };

    const response = await fetch(url, mergedOptions);
    return response.json();
}

/* Generate token */ 
export async function generateToken() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/auth/login`, {
        method: "POST",
        body: JSON.stringify({
            "email": process.env.NEXT_PUBLIC_BB_SERVICE_ACCOUNT,
            "password": process.env.NEXT_PUBLIC_BB_SERVICE_KEY,
            "web": true
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept-Encoding': 'deflate, gzip',
        },
        cache: 'no-store'
    });

    const token = await res.json();
    return token.token;
}

async function createSheet(project: string, database: string, SQL: string) {
    const token = await generateToken();
    const newSheet = {
        database: database,
        title: ``,
        content: Buffer.from(SQL).toString('base64'),
        type: `TYPE_SQL`,
        source: `SOURCE_BYTEBASE_ARTIFACT`,
        visibility: `VISIBILITY_PUBLIC`,
    };

    const response = await fetchData(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/${project}/sheets`, token, {
        method: 'POST',
        body: JSON.stringify(newSheet)
    });

    return response;
}

async function createPlan(project: string, database: string, sheetName: string) {
    const token = await generateToken();
    const newPlan = {
        "steps": [
            {
                "specs": [
                    {
                        "id": v4(),
                        "change_database_config": {
                            "target": database,
                            "type": `MIGRATE`,
                            "sheet": sheetName
                        }
                    }
                ]
            }
        ],
        "title": `Change database ${database}`,
        "description": "MIGRATE"
    };

    const response = await fetchData(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/${project}/plans`, token, {
        method: 'POST',
        body: JSON.stringify(newPlan)
    });

    return response;
}

async function createIssue(project: string, database: string, planName: string) {
    const token = await generateToken();
    const newIssue = {
        "approvers": [],
        "approvalTemplates": [],
        "subscribers": [],
        "title": `Issue: Change database ${database}`,
        "description": "dddd",
        "type": "DATABASE_CHANGE",
        "assignee": "",
        "plan": planName
    };

    const response = await fetchData(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/${project}/issues`, token, {
        method: 'POST',
        body: JSON.stringify(newIssue)
    });

    return response;
}

async function createRollout(project: string, planName: string) {
    const token = await generateToken();
    const newRollout = { "plan": planName };

    const response = await fetchData(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/${project}/rollouts`, token, {
        method: 'POST',
        body: JSON.stringify(newRollout)
    });

    return response;
}

export async function createIssueWorkflow(project: string, database: string, SQL: string) {

    console.log("=============createIssueWorkflow", project, database, SQL);
    try {
        const sheetData = await createSheet(project, database, SQL);
        console.log("--------- createdSheetData ----------", sheetData);

        const planData = await createPlan(project, database, sheetData.name);
        console.log("--------- createdPlanData ----------", planData);

        const issueData = await createIssue(project, database, planData.name);
        console.log("--------- createdIssue ----------", issueData);

        const rolloutData = await createRollout(project, planData.name);
        console.log("--------- createdRollout ----------", rolloutData);

        // Extract the project name from the full project string
        const projectName = project.split('/')[1];

        // Extract just the issue number from issueData.name
        const issueNumber = issueData.name.split('/').pop();

        // Construct the correct issue URL
        const issueLink = `${process.env.NEXT_PUBLIC_BB_HOST}/projects/${projectName}/issues/${issueNumber}`;

        return {
            success: true,
            message: `Issue created successfully. View it here: ${issueLink}`,
            issueData: issueData,
            issueLink: issueLink
        };
    } catch (error) {
        console.error("Error in createIssueWorkflow:", error);
        return {
            success: false,
            message: "Failed to create issue",
            error: error instanceof Error ? error.message : String(error)
        };
    }
}