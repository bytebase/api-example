import AddForm from '@/components/add-form';

export default async function Home() {

  /* Generate token
  */ 

  const url = `${process.env.BB_HOST}/v1/auth/login`;
  const tokenres = await fetch(url,{
    method: "POST",
    body: JSON.stringify({ "email":process.env.BB_EMAIL,"password":process.env.BB_PASSWORD,"web":true}),
    headers: {
    'Content-Type': 'application/json',
    'Accept-Encoding': 'deflate, gzip',
  }});


  console.log("process.env.BB_HOST----------------")
  console.log(process.env.BB_HOST)
  console.log(process.env.BB_EMAIL)
  console.log(process.env.BB_PASSWORD)
  
  const tokendata = await tokenres.json();
  console.log("tokendata.token----------------")
  console.log(tokendata.token)

  console.log("------------------------------")

 // let tdata = tokendata.token;
  
  /* Fetch projects */ 
  const projectres = await fetch("https://demo.bytebase.com/v1/projects", {
    method: "GET",
    headers: {
      "Authorization": 'Bearer '+ process.env.BB_TOKEN,
}});

  const projectdata = await projectres.json();

  /* Fetch all databases */
  const alldbres = await fetch("https://demo.bytebase.com/v1/instances/-/databases", {
    method: "GET",
    headers: {
      "Authorization": 'Bearer '+ process.env.BB_TOKEN,
  }});

  const alldbdata = await alldbres.json();
  //console.log(alldbdata.databases);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AddForm allprojects={projectdata.projects} alldbs={alldbdata.databases} />
    </main>

  )
}
