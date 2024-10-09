import { generateToken } from '@/app/api/utils';

export async function GET(
  request: Request,
  { params }: { params: { project: string } }
) {
  const token = await generateToken();
  const project = params.project;

  console.log("passed in project", project);

  const response = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/projects/${project}/databases`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await response.json();
  return Response.json(data);
}