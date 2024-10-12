import { updateJiraIssueStatus } from '../utils';

interface BytebaseWebhookPayload {
    level: string;
    activity_type: string;
    title: string;
    description: string;
    link: string;
    creator_id: number;
    creator_name: string;
    created_ts: number;
    issue: {
        id: number;
        name: string;
        status: string;
        type: string;
        description: string;
    };
    project: {
        id: number;
        name: string;
    };
}

interface ParsedBytebaseData {
    issueId: number;
    issueName: string;
    issueStatus: string;
    issueType: string;
    issueDescription: string;
    projectId: number;
    projectName: string;
    bytebaseIssueLink: string;
    jiraIssueKey: string | null;
}

// Declare the global variable
declare global {
    // eslint-disable-next-line no-var
    var lastBytebaseWebhook: ParsedBytebaseData | null;
}

export async function POST(request: Request) {
  //  console.log(`${request.method} request received`, request);
    try {

        let jiraIssueKeyMatch = null
        const payload: BytebaseWebhookPayload = await request.json();
       // console.log('bb-issue webhook Received payload:', JSON.stringify(payload));

        // Check if it's an issue status update
        if (payload.activity_type === "bb.issue.status.update") {

            console.log("=========payload.issue.name",payload.issue.name);
            console.log("=========payload.issue.description",payload.issue.description);
            // Extract Jira issue key from title or description
            jiraIssueKeyMatch = payload.issue.name.match(/\[JIRA>([^\]]+)\]/);

            console.log("==========jiraIssueKeyMatch", jiraIssueKeyMatch);
            const jiraIssueKey = jiraIssueKeyMatch ? jiraIssueKeyMatch[1] : null;

            if (jiraIssueKey) {
                let jiraStatus;
                if (payload.issue.status === "DONE") {
                    jiraStatus = "Done";
                } else if (payload.issue.status === "OPEN") {
                    jiraStatus = "In Progress";
                }

                if (jiraStatus) {
                    try {
                        await updateJiraIssueStatus(jiraIssueKey, jiraStatus);
                        console.log(`Updated Jira issue ${jiraIssueKey} status to ${jiraStatus}`);
                    } catch (error) {
                        console.error(`Failed to update Jira issue ${jiraIssueKey} status:`, error);
                    }
                }
            }
        }

        // Standardize the Bytebase Issue Link format
        let bytebaseIssueLink = payload.link;
        const bbHost = process.env.NEXT_PUBLIC_BB_HOST;
        if (bytebaseIssueLink && bbHost) {
            if (bytebaseIssueLink.startsWith(bbHost)) {
                bytebaseIssueLink = bytebaseIssueLink.substring(bbHost.length);
            }
            if (!bytebaseIssueLink.startsWith('/')) {
                bytebaseIssueLink = '/' + bytebaseIssueLink;
            }
            bytebaseIssueLink = bbHost + bytebaseIssueLink;
        }

        const parsedData: ParsedBytebaseData = {
            issueId: payload.issue.id,
            issueName: payload.issue.name,
            issueStatus: payload.issue.status,
            issueType: payload.issue.type,
            issueDescription: payload.issue.description,
            projectId: payload.project.id,
            projectName: payload.project.name,
            bytebaseIssueLink: bytebaseIssueLink,
            jiraIssueKey: jiraIssueKeyMatch ? jiraIssueKeyMatch[1] : null,
        };

        // Store the parsed data in a global variable
        global.lastBytebaseWebhook = parsedData;

        return Response.json({ message: 'Webhook received and processed successfully', data: parsedData });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return Response.json({ error: 'Error processing webhook' }, { status: 500 });
    }
}
