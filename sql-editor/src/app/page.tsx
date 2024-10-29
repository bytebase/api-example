'use client';

import { useState } from 'react';

interface Credentials {
  username: string;
  email: string;
  password: string;
}
interface UserData {
  credentials: Credentials;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const generateUsernameFromEmail = (email: string) => {
    // Remove all special characters including @ and . and convert to lowercase
    return email.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  };

  const handleCreateUser = async () => {
    setEmailError(null);
    setError(null);

    if (!email) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const username = generateUsernameFromEmail(email);
      const response = await fetch('/api/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserData({
          credentials: data.credentials
        });
      } else {
        throw new Error('Failed to create user');
      }
    } catch (err) {
      setError('An error occurred while creating the user and project');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 pt-6">
      <h1 className="text-4xl font-bold mt-0 mb-8">Embedded Bytebase SQL Editor Demo</h1>
      
      {!userData && (
        <div className="w-full max-w-md">
          <div className="mb-4">
          <h2 className="text-xl font-bold mb-4 text-red-500">Logout your Bytebase account in the same browser before starting</h2>
            <label htmlFor="email" className="block mb-2">
              Email Address to sign in with Google OAuth
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
          <button
            onClick={handleCreateUser}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Start'}
          </button>
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      {userData && (
        <div className="mt-8 w-full">
          <h2 className="text-2xl font-bold mb-4">

            {generateUsernameFromEmail(userData.credentials.email) === userData.credentials.username ? 'User/Project/Database with same name created successfully' : 'User already exists, Project/Database with same name created successfully'}
            
          </h2>
          <div className="bg-gray-100 p-6 rounded-lg mb-4 flex flex-wrap">
            <div className="w-1/2 p-2">
              <p><strong>Username:</strong> {userData.credentials.username}</p>
              <p><strong>Email:</strong> {userData.credentials.email}</p>
              <p><strong>Password:</strong> {userData.credentials.password}</p>
            </div>
            <div className="w-1/2 p-2">
              <p><strong>Project Title:</strong> {userData.credentials.username}</p>
              <p><strong>Project Key:</strong> {userData.credentials.username}</p>
              <p><strong>Database:</strong> {userData.credentials.username}</p>
            </div>
          </div>
          <div className="w-full h-screen border border-gray-300 rounded-lg overflow-hidden">
          <iframe
  src={`https://accounts.google.com/o/oauth2/v2/auth?state=event%3Dbb.oauth.signin.idps%252Fgoogle-9xyt%26popup%3Dfalse%26redirect%3D%252Fsql-editor%252Fprojects%252F${userData.credentials.username}&response_type=code&client_id=${process.env.NEXT_PUBLIC_BB_OAUTH_CLIENT_ID}&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_BB_OAUTH_CLIENT_CALLBACK_URL)}`}
  className="w-full h-full"
  title="Bytebase Dashboard"
/>

          </div>
        </div>
      )}
    </main>
  );
}
