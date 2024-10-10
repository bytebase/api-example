interface JiraWebhookPayload {
  issue: {
    key: string;
    fields: {
      issuetype: {
        name: string;
      };
      project: {
        key: string;
      };
      summary: string;
      description: string;
      customfield_10038: string; // SQL statement
      customfield_10040: string; // Database name
      customfield_10039: string; // Bytebase issue link
      status: {
        name: string;
      };
    };
  };
}

interface ParsedData {
  issueKey: string;
  issueType: string;
  projectKey: string;
  summary: string;
  description: string;
  sqlStatement: string;
  database: string;
  status: string;
  bytebaseIssueLink: string;
}

// Declare the global variable
declare global {
  // eslint-disable-next-line no-var
  var lastJiraWebhook: ParsedData | null;
}

export async function POST(request: Request) {
    console.log(`${request.method} request received`, request);

    try {
        const body: JiraWebhookPayload = await request.json();
        console.log('Received payload:', JSON.stringify(body));

        const issueType = body.issue.fields.issuetype.name;
        if (issueType !== 'Database Change') {
            return Response.json({ error: 'Not a Database Change issue' }, { status: 400 });
        }

        const issueKey = body.issue.key;
        const projectKey = body.issue.fields.project.key;
        const summary = body.issue.fields.summary;
        const description = body.issue.fields.description;
        const sqlStatement = body.issue.fields.customfield_10038;
        const database = body.issue.fields.customfield_10040;
        const status = body.issue.fields.status.name;
        const bytebaseIssueLink = body.issue.fields.customfield_10039;

        const parsedData: ParsedData = {
            issueKey,
            issueType,
            projectKey,
            summary,
            description,
            sqlStatement,
            database,
            status,
            bytebaseIssueLink,
        };

        // Store the parsed data in a global variable
        global.lastJiraWebhook = parsedData;

        return Response.json({ message: 'Webhook received and processed successfully', data: parsedData });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return Response.json({ error: 'Error processing webhook' }, { status: 500 });
    }
}