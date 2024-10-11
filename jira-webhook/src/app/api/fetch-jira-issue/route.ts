// Declare the global variable
declare global {
  // eslint-disable-next-line no-var
  var lastJiraWebhook: {
    issueKey: string;
    issueType: string;
    projectKey: string;
    summary: string;
    description: string;
    sqlStatement: string;
    database: string;
    status: string;
    bytebaseIssueLink: string;
    webhookType: string; // New field for webhook type
  } | null;
}

export async function GET() {
  // Retrieve the last Jira webhook data from the global variable
  const lastJiraWebhook = global.lastJiraWebhook || null;

  // If there's no webhook data, return null
  if (!lastJiraWebhook) {
    return Response.json(null);
  }

  // Ensure webhookType is included in the response
  const responseData = {
    ...lastJiraWebhook,
    webhookType: lastJiraWebhook.webhookType || 'Unknown' // Fallback to 'Unknown' if not set
  };

  return Response.json(responseData);
}