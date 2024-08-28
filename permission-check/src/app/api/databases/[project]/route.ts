import generateToken from '@/app/api/token';

export async function GET(request: Request,
  { params }: { params: { project: string }}) {

  const project = params.project;
  const token = await generateToken();

  console.log("project --------------", project)

  const res = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/${project}/databases`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer '+ token 
      },
      cache: 'no-store'
    });
    const data = await res.json();

    console.log("dbs --------------", data)
    return Response.json(data);
}