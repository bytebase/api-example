import React from 'react';

async function getProjects() {
  try {
    const token = await generateToken();
    const url = `${process.env.NEXT_PUBLIC_BB_HOST}/v1/projects`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 },
    });
    
    if (!response.ok) {
      throw new Error(`API 请求失败: ${response.status}`);
    }

    const data = await response.json();
    return data.projects || [];
  } catch (error) {
    console.error('获取项目列表失败:', error);
    throw new Error('获取项目列表时发生错误');
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

const ProjectCard = ({ project }) => (
  <div 
    key={project.key} 
    className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
  >
    <h2 className="font-semibold text-lg">{project.name}</h2>
    <div className="mt-2 text-gray-600 space-y-1">
      <p>标题: {project.title || '暂无标题'}</p>
      <p>状态: <span className={`inline-block px-2 py-1 rounded ${
        project.state === 'active' ? 'bg-green-100 text-green-800' : 
        'bg-gray-100 text-gray-800'
      }`}>{project.state}</span></p>
    </div>
  </div>
);

export default async function Home() {
  let projects = [];
  let error = null;

  try {
    projects = await getProjects();
  } catch (e) {
    error = e.message;
  }

  return (
    <div className="grid items-center justify-items-center p-5">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <h1 className="text-2xl font-bold">Bytebase 项目列表</h1>
        
        {error ? (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg w-full">
            {error}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 w-full">
            {projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard key={project.key} project={project} />
              ))
            ) : (
              <div className="col-span-full text-center py-8 bg-gray-50 rounded-lg">
                暂无项目数据
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
