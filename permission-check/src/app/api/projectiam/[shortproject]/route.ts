import generateToken from '@/app/api/token';

export async function GET(request: Request,
  { params }: { params: { shortproject: string }}) {

  const shortproject = params.shortproject;
  const token = await generateToken();

  console.log("shortproject --------------", shortproject)

  const res = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/projects/${shortproject}:getIamPolicy`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer '+ token 
      },
      cache: 'no-store'
    });
    const data = await res.json();

   // console.log("data --------------", data)
    return Response.json(data);
}