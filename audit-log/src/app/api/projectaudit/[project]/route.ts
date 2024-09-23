import {generateToken} from '@/app/api/utils';

export async function POST(request: Request, {params}: {params: {project: string}}) {

  const token = await generateToken();
  const requestbody = await request.json();

  console.log("params.project --------------", params.project)

  const res = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/${params.project}/auditLogs:search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer '+ token 
      },
      body: JSON.stringify(requestbody),
      cache: 'no-store'
    });
    const data = await res.json();

    console.log("data --------------", data)

    return Response.json(data);
}