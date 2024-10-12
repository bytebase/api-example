export async function POST(request: Request) {
    console.log(`${request.method} request received`, request);
    try {
        const payload: BytebaseWebhookPayload = await request.json();
        console.log('Received payload:', JSON.stringify(payload));

        const parsedData: ParsedBytebaseData = {
            issueId: payload.issue.id,
            issueName: payload.issue.name,
            issueStatus: payload.issue.status,
            issueType: payload.issue.type,
            issueDescription: payload.issue.description,
            projectId: payload.project.id,
            projectName: payload.project.name,
            bytebaseIssueLink: payload.link,
        };

        // Store the parsed data in a global variable
        global.lastBytebaseWebhook = parsedData;

        return Response.json({ message: 'Webhook received and processed successfully' });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return Response.json({ message: 'Error processing webhook', error: error.message }, { status: 500 });
    }
}
