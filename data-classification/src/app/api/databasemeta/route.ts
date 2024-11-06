import { generateToken } from "../utils";

export async function GET() {

    const token = await generateToken();
    const instance = 'prod-sample-instance';
    const database = 'hr_prod';

    const response = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/instances/${instance}/databases/${database}/metadata`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": 'Bearer '+ token 
        },
        cache: 'no-store'
    });

    const data = await response.json();
    return Response.json(data);
}


export async function PATCH(request: Request) {

  const req = await request.json();
  const token = await generateToken();
  const instance = 'prod-sample-instance';
  const database = 'hr_prod';

  const response = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/instances/${instance}/databases/${database}/metadata`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer '+ token 
      },
      body: JSON.stringify(req),
      cache: 'no-store'
  });

  const data = await response.json();
  return Response.json(data);
}