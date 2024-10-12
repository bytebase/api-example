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
    try {
        const payload: BytebaseWebhookPayload = await request.json();

        // Only process "bb.issue.status.update" activity type
        if (payload.activity_type === "bb.issue.status.update") {
            console.log("Processing bb.issue.status.update");
            
            const jiraIssueKeyMatch = payload.issue.name.match(/\[JIRA>([^\]]+)\]/);
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
                        return Response.json({ error: 'Failed to update Jira issue status' }, { status: 500 });
                    }
                }
            }

            // Keep the original parsed data structure
            const parsedData: ParsedBytebaseData = {
                issueId: payload.issue.id,
                issueName: payload.issue.name,
                issueStatus: payload.issue.status,
                issueType: payload.issue.type,
                issueDescription: payload.issue.description,
                projectId: payload.project.id,
                projectName: payload.project.name,
                bytebaseIssueLink: payload.link,
                jiraIssueKey: jiraIssueKey,
            };

            // Store the parsed data in a global variable
            global.lastBytebaseWebhook = parsedData;

            return Response.json({ message: 'Webhook processed successfully', data: parsedData });
        }

        // If it's not a "bb.issue.status.update" activity, return early
        return Response.json({ message: 'Webhook received but not processed (not a status update)' });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return Response.json({ error: 'Error processing webhook' }, { status: 500 });
    }
}
