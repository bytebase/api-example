import { generateToken } from '@/app/api/utils';

export async function POST(request: Request
    ) {
  
    const req = await request.json();
    const token = await generateToken();
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/sql/check`, {
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