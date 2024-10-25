'use client';

import { useState } from 'react';

interface Credentials {
  username: string;
  email: string;
  password: string;
}

interface Project {
  id: string;
  title: string;
  key: string;
  // Add other project properties as needed
}

interface UserData {
  credentials: Credentials;
  project: Project;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/create-user');
      if (response.ok) {
        const data = await response.json();
        setUserData({
          credentials: data.credentials,
          project: data.project
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
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to Bytebase Demo</h1>
      {!userData && (
        <button
          onClick={handleCreateUser}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? 'Creating...' : 'Start'}
        </button>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {userData && (
        <div className="mt-8 w-full">
          <h2 className="text-2xl font-bold mb-4">User and Project Created Successfully</h2>
          <div className="bg-gray-100 p-6 rounded-lg mb-4">
            <p><strong>Username:</strong> {userData.credentials.username}</p>
            <p><strong>Email:</strong> {userData.credentials.email}</p>
            <p><strong>Password:</strong> {userData.credentials.password}</p>
            <p><strong>Project Title:</strong> {userData.project.title}</p>
            <p><strong>Project Key:</strong> {userData.project.key}</p>
          </div>
          <p className="mt-4 mb-4 text-sm text-gray-600">Please save these credentials and project details for future use.</p>
          <div className="w-full h-screen border border-gray-300 rounded-lg overflow-hidden">
            <iframe
              src={`${process.env.NEXT_PUBLIC_BB_HOST}/auth?email=${userData.credentials.email}&password=${userData.credentials.password}`}
              className="w-full h-full"
              title="Bytebase Dashboard"
            />
          </div>
        </div>
      )}
    </main>
  );
}
