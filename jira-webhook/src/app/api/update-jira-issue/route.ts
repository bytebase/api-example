export async function POST(request: Request) {

    console.log("=============update-jira-issue", request)

    const { issueKey } = await request.json();
  const currentTime = new Date().toISOString();

  if (!issueKey) {
    return Response.json({ error: 'Issue key is missing' }, { status: 400 });
  }

  const jiraApiUrl = `https://bytebase.atlassian.net/rest/api/3/issue/${issueKey}`;
  const jiraTransitionUrl = `${jiraApiUrl}/transitions`;
  const jiraAuth = Buffer.from(
    `${process.env.NEXT_PUBLIC_JIRA_EMAIL}:${process.env.NEXT_PUBLIC_JIRA_API_TOKEN}`
  ).toString('base64');

  console.log("=============update-jira-issue jiraApiUrl", jiraApiUrl)

  try {
    // First, update the Bytebase issue link
    const updateResponse = await fetch(jiraApiUrl, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${jiraAuth}`,
      },
      body: JSON.stringify({
        fields: {
          customfield_10039: `http://bytebase.com/issue/${currentTime}`
        }
      }),
    });

    if (!updateResponse.ok) {
      const updateResponseText = await updateResponse.text();
      return Response.json({ 
        error: 'Failed to update Bytebase issue link', 
        status: updateResponse.status,
        statusText: updateResponse.statusText,
        responseBody: updateResponseText
      }, { status: updateResponse.status });
    }

    // Transition the issue to "In Progress" using the known transition ID
    const transitionResponse = await fetch(jiraTransitionUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${jiraAuth}`,
      },
      body: JSON.stringify({
        transition: {
          id: "21" // Hardcoded "In Progress" transition ID
        }
      }),
    });

    console.log("Transition Response status:", transitionResponse.status);
    console.log("Transition Response headers:", Object.fromEntries(transitionResponse.headers.entries()));

    const transitionResponseText = await transitionResponse.text();
    console.log("Transition Response body:", transitionResponseText);

    if (!transitionResponse.ok) {
      return Response.json({ 
        error: 'Failed to transition Jira issue', 
        status: transitionResponse.status,
        statusText: transitionResponse.statusText,
        responseBody: transitionResponseText
      }, { status: transitionResponse.status });
    }

    return Response.json({ status: 'Bytebase issue link updated and issue transitioned to In Progress', data: null });
  } catch (error) {
    console.error('Error updating Jira issue:', error);
    return Response.json({ 
      error: 'Failed to update Jira issue', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}