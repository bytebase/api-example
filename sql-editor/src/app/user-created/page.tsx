'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserCreated() {
  const [credentials, setCredentials] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCredentials = async () => {
      const response = await fetch('/api/create-user');
      if (response.ok) {
        const data = await response.json();
        setCredentials(data.credentials);
      } else {
        console.error('Failed to create user');
        router.push('/');
      }
    };

    fetchCredentials();
  }, [router]);

  if (!credentials) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">User Created Successfully</h1>
      <div className="bg-gray-100 p-6 rounded-lg">
        <p><strong>Username:</strong> {credentials.username}</p>
        <p><strong>Email:</strong> {credentials.email}</p>
        <p><strong>Password:</strong> {credentials.password}</p>
      </div>
      <p className="mt-4 text-sm text-gray-600">Please save these credentials for future use.</p>
    </div>
  );
}
