import { generateToken } from "@/app/api/utils";

export async function GET(request: Request) {

  const token = await generateToken();

  const res = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": 'Bearer '+ token 
      },
      cache: 'no-store'
    });
    const data = await res.json();

    console.log("projects --------------", data)
    return Response.json(data);
}