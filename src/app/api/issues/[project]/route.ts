export async function POST(request: Request,
  { params }: { params: { project: string }}
  ) {

  const req = await request.json();
  const project = params.project;

  const res = await fetch(`https://demo.bytebase.com/v1/${project}/issues`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer '+ process.env.BB_TOKEN 
      },
      body: JSON.stringify(req)
    });
   
    const data = await res.json();
    return Response.json(data);
}