import { generateBBToken } from "../utils";

function generateRandomString(length: number): string {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
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
    const username = `user_${generateRandomString(8)}`;
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
    console.log('User created successfully in Bytebase');

    // Create project using the username
    console.log(`Creating project for user: ${username}`);
    const createProjectResponse = await fetch('https://api.bytebase.com/v1/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: `projects/${username}`,
        title: username,
      }),
    });

    if (!createProjectResponse.ok) {
      console.error('Failed to create project', await createProjectResponse.text());
      throw new Error('Failed to create project');
    }
    console.log('Project created successfully');

    console.log('User creation process completed successfully');

    // Return the credentials
    return new Response(JSON.stringify({ message: 'User and project created successfully', credentials: { username, email, password } }), {
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
