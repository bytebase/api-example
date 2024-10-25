import { createBBIssueWorkflow, generateBBToken, grantUserRoleProjectOwner, switchWorkspaceMode } from "../utils";

function generateRandomString(length: number): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export async function GET(request: Request) {
  try {
    console.log('Starting user creation process');

    // Generate random username, email, and password
    const username = `${generateRandomString(8)}`;
    const email = `${username}@example.com`;
    const password = generateRandomString(12);
    console.log(`Generated credentials - Username: ${username}, Email: ${email}`);

    // Generate Bytebase token
    console.log('Generating Bytebase token');
    const token = await generateBBToken();
    console.log('Bytebase token generated successfully');

    // Create user in Bytebase
    console.log('Creating user in Bytebase');
    const createUserResponse = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: username,
        email: email,
        password: password,
        userType: 'USER',
        state: 'ACTIVE',
      }),
    });

    if (!createUserResponse.ok) {
      console.error('Failed to create user', await createUserResponse.text());
      throw new Error('Failed to create user');
    }
    console.log('User created successfully in Bytebase', createUserResponse);

    // Create project using the username
    console.log(`Creating project for user: ${username}`);
    const createProjectResponse = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/projects?projectId=${username}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: username,
        key: username,
      }),
    });

    if (!createProjectResponse.ok) {
      console.error('Failed to create project', await createProjectResponse.text());
      throw new Error('Failed to create project');
    }
    const createdProject = await createProjectResponse.json();
    console.log('Project created successfully:', createdProject);

    console.log('User creation process completed successfully');

    console.log('now create db');
    const createdDB = await createBBIssueWorkflow(username)
    console.log("after creating db", createdDB)


    // Grant the user project querier role
    const grantresult = await grantUserRoleProjectOwner(username);
    console.log("after grantUserRole", grantresult)

    // Switch the workspace to Editor mode
    const switchresult = await switchWorkspaceMode();
    console.log("after switchWorkspaceMode", switchresult)
    // Return the credentials and created project
    return new Response(JSON.stringify({
      message: 'User and project created successfully',
      credentials: { username, email, password },
      project: createdProject,
      database: createdDB
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in user creation process:', error);
    return new Response(JSON.stringify({ error: 'An error occurred while creating the user and project' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
