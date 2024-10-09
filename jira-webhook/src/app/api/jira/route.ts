import { NextResponse } from 'next/server';

interface JiraWebhookPayload {
  issue: {
    fields: {
      issuetype: {
        name: string;
      };
      project: {
        key: string;
      };
      description: string;
      customfield_10038: string; // SQL statement
      customfield_10040: string; // Database name
      status: {
        name: string;
      };
    };
  };
}

interface ParsedData {
  issueType: string;
  projectKey: string;
  description: string;
  sqlStatement: string;
  database: string;
  status: string;
}

// Declare the global variable
declare global {
  // eslint-disable-next-line no-var
  var lastJiraWebhook: ParsedData | null;
}

export async function POST(request: Request) {
    console.log(`${request.method} request received`);

    try {
        const body: JiraWebhookPayload = await request.json();
        console.log('Received payload:', JSON.stringify(body));

        const issueType = body.issue.fields.issuetype.name;
        if (issueType !== 'Database Change') {
            return NextResponse.json({ error: 'Not a Database Change issue' }, { status: 400 });
        }

        const projectKey = body.issue.fields.project.key;
        const description = body.issue.fields.description;
        const sqlStatement = body.issue.fields.customfield_10038;
        const database = body.issue.fields.customfield_10040;
        const status = body.issue.fields.status.name;

        const parsedData: ParsedData = {
            issueType,
            projectKey,
            description,
            sqlStatement,
            database,
            status,
        };

        // Store the parsed data in a global variable
        global.lastJiraWebhook = parsedData;

        return NextResponse.json({ message: 'Webhook received and processed successfully', data: parsedData });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return NextResponse.json({ error: 'Error processing webhook' }, { status: 500 });
    }
}