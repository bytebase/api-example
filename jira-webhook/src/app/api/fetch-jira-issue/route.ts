// Declare the global variable
declare global {
  // eslint-disable-next-line no-var
  var lastJiraWebhook: {
    issueKey: string;
    issueType: string;
    projectKey: string;
    description: string;
    sqlStatement: string;
    database: string;
    status: string;
  } | null;
}

export async function GET() {
  // Retrieve the last Jira webhook data from the global variable
  const lastJiraWebhook = global.lastJiraWebhook || null;

  return Response.json(lastJiraWebhook);
}