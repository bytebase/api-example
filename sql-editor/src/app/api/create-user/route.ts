import { createBBIssueWorkflow, generateBBToken, grantUserRoleProjectOwner, switchWorkspaceMode } from "../utils";

function generateRandomString(length: number): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export async function POST(request: Request) {
  try {
    const { email, username: initialUsername } = await request.json();
    let username = initialUsername;
    console.log('Starting user creation process');

    console.log(`Generated credentials - Username: ${username}, Email: ${email}`);

    // Generate Bytebase token
    const token = await generateBBToken();

    // Check if the user already exists
    const userExistsResponse = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/users/${email}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    const userExists = await userExistsResponse.json();
    console.log('User exists response', userExists);

    const password = generateRandomString(12);

    if (userExists.code === 5) {
        // Create user in Bytebase
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
        throw new Error('Failed to create user');
      }
    } else {
      username = userExists.title;
    }

    // Create project using the username

    // Check if the project already exists
    const projectExistsResponse = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/projects/${username}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });


    const projectExists = await projectExistsResponse.json();
    console.log('Project exists response', projectExists);

    if (projectExists.code === 5) {

      console.log('Creating project::::::::::::');

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
        throw new Error(`Failed to create project`);
      }

      const createdProject = await createProjectResponse.json();

      console.log('createdProject--------', createdProject);
    }

    // Check if the database already exists
    const databaseExistsResponse = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/instances/test-sample-instance/databases/${username}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });

    const databaseExists = await databaseExistsResponse.json();
    console.log('Database exists response', databaseExists);

    if (databaseExists.status !== 200) {
      // Create database
      const createdDBResponse = await createBBIssueWorkflow(username);

      console.log('createdDBResponse--------', createdDBResponse);
    }

    // Grant the user project owner role
    await grantUserRoleProjectOwner(username, email);

    // Switch the workspace to Editor mode
    await switchWorkspaceMode();

    return new Response(JSON.stringify({
      message: 'User and project created successfully',
      credentials: { username, email, password }
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
