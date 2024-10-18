'use client';

import { useState } from 'react';

export default function Home() {
  const [credentials, setCredentials] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/create-user');
      if (response.ok) {
        const data = await response.json();
        setCredentials(data.credentials);
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
      {!credentials && (
        <button
          onClick={handleCreateUser}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {loading ? 'Creating...' : 'Start'}
        </button>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {credentials && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">User Created Successfully</h2>
          <div className="bg-gray-100 p-6 rounded-lg">
            <p><strong>Username:</strong> {credentials.username}</p>
            <p><strong>Email:</strong> {credentials.email}</p>
            <p><strong>Password:</strong> {credentials.password}</p>
          </div>
          <p className="mt-4 text-sm text-gray-600">Please save these credentials for future use.</p>
        </div>
      )}
    </main>
  );
}
