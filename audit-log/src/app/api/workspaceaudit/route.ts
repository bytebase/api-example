import {generateToken} from '../utils';

export async function POST(request: Request) {

  const token = await generateToken();
  const requestbody = await request.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/auditLogs:search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer '+ token 
      },
      body: JSON.stringify(requestbody),
      cache: 'no-store'
    });
    const data = await res.json();

    return Response.json(data);
}