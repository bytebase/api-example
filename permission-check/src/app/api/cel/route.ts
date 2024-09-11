import { generateToken } from "@/app/api/utils";

export async function POST(request: Request,
  { params }: { params: { expressions: string[] }}) {

    const req = await request.json();
  const token = await generateToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/cel/batchParse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer '+ token 
      },
      cache: 'no-store',
      body: JSON.stringify(req)
    });
    const data = await res.json();

    console.log("cel data --------------", data)
    return Response.json(data);
}