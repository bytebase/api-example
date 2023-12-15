import generateToken from '@/app/api/token';

export async function POST(request: Request,
  { params }: { params: { project: string }}
  ) {

  const req = await request.json();
  const project = params.project;
  const token = await generateToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/${project}/issues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer '+ token
      },
      body: JSON.stringify(req)
    });
   
    const data = await res.json();
    return Response.json(data);
}