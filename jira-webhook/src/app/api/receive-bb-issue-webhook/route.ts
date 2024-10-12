export async function POST(request: Request) {
    console.log(`${request.method} request received`, request);
    const payload = await request.json();
    console.log('Received payload:', JSON.stringify(payload));

    return Response.json({ message: 'Webhook received and processed successfully' });
}