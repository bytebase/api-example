import { NextResponse } from 'next/server';

export async function POST(request: Request) {

    console.log("=============update-jira-issue", request)

    const { issueKey } = await request.json();
  const currentTime = new Date().toISOString();

  if (!issueKey) {
    return NextResponse.json({ error: 'Issue key is missing' }, { status: 400 });
  }

  const jiraApiUrl = `https://bytebase.atlassian.net/rest/api/3/issue/${issueKey}`;
  const jiraAuth = Buffer.from(
    `${process.env.NEXT_PUBLIC_JIRA_EMAIL}:${process.env.NEXT_PUBLIC_JIRA_API_TOKEN}`
  ).toString('base64');



  console.log("=============update-jira-issue jiraApiUrl", jiraApiUrl)

  try {
    const response = await fetch(jiraApiUrl, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${jiraAuth}`,
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
                    text: `Description updated at ${currentTime}`,
                    type: "text"
                  }
                ]
              }
            ]
          }
        }
      }),
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log("Response body:", responseText);

    if (!response.ok) {
      return NextResponse.json({ 
        error: 'Failed to update Jira issue', 
        status: response.status,
        statusText: response.statusText,
        responseBody: responseText
      }, { status: response.status });
    }

    // If the response is empty or not JSON, return success without parsing
    if (!responseText.trim()) {
      return NextResponse.json({ status: 'Issue description updated', data: null });
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      return NextResponse.json({ 
        status: 'Issue description likely updated, but response was not JSON',
        responseBody: responseText
      }, { status: 200 });
    }

    return NextResponse.json({ status: 'Issue description updated', data });
  } catch (error) {
    console.error('Error updating Jira issue:', error);
    return NextResponse.json({ 
      error: 'Failed to update Jira issue', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}