import { generateToken } from "../utils";

export async function GET() {

    const token = await generateToken();

    const response = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/settings/bb.workspace.data-classification`, {
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