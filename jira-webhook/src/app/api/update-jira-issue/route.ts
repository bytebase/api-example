export async function POST(request: Request) {
  const { issueKey } = await request.json();
  const currentTime = new Date().toISOString();

  console.log("=============issueKey", issueKey);

  if (!issueKey) {
    return new Response(JSON.stringify({ error: 'Issue key is missing' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  try {
    const response = await fetch(
      `https://bytebase.atlassian.net/rest/api/3/issue/${issueKey}`,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(
            `${process.env.NEXT_PUBLIC_JIRA_EMAIL}:${process.env.NEXT_PUBLIC_JIRA_API_TOKEN}`
          ).toString('base64')}`,
        },
        body: JSON.stringify({
          fields: {
            description: {
              type: "doc",
              version: 1,
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      text: `Updated at ${currentTime}`,
                      type: "text"
                    }
                  ]
                }
              ]
            }
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify({ status: 'Issue description updated', data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error updating Jira issue:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to update Jira issue', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}