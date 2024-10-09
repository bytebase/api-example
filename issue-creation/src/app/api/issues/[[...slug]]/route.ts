import { generateToken } from '@/app/api/utils';

export async function POST(request: Request,
  { params }: { params: { slug: string[] } }
  ) {

  if (params.slug.length > 1)
  return ;

  const req = await request.json();
  const project = params.slug[0];
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


export async function GET(request: Request,
  { params }: { params: { slug: string[] } }
  ) {

  if (params.slug.length < 2)
  {return;}

  const project = params.slug[0];
  const issue = params.slug[1];
  const token = await generateToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/${project}/issues/${issue}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer '+ token
      }
    });
   
    const data = await res.json();
    return Response.json(data);
}