import React from 'react';

async function getProjects() {
  try {
    const token = await generateToken();
    const url = `${process.env.NEXT_PUBLIC_BB_HOST}/v1/projects`;
    console.log('Requesting URL:', url);

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    
    const text = await response.text();
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} - ${text}`);
    }

    try {
      const data = JSON.parse(text);
      return data.projects || [];
    } catch {
      console.error('Invalid JSON response');
      return [];
    }
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}

export async function generateToken() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/auth/login`, {
      method: "POST",
      body: JSON.stringify({
          "email": process.env.NEXT_PUBLIC_BB_SERVICE_ACCOUNT,
          "password": process.env.NEXT_PUBLIC_BB_SERVICE_KEY,
          "web": true
      }),
      headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'deflate, gzip',
      },
      cache: 'no-store'
  });

  const token = await res.json();
  return token.token;
}

export default async function Home() {
  const projects = await getProjects();
  console.log('Projects in Home:', projects);

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bytebase 项目列表</h1>
      <div className="grid gap-4">
        {Array.isArray(projects) && projects.length > 0 ? (
          projects.map((project) => (
            <div 
              key={project.key} 
              className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="font-semibold text-lg">{project.name}</h2>
              <div className="mt-2 text-gray-600">
                <p>标题: {project.title}</p>
                <p>状态: {project.state}</p>
                {/* 如果需要显示其他属性，可以在这里添加 */}
              </div>
            </div>
          ))
        ) : (
          <p>暂无项目数据</p>
        )}
      </div>
    </main>
  );
}
