/* Generate token */ 
export default async function generateToken(){

    const res = await fetch(`${process.env.NEXT_PUBLIC_BB_HOST}/v1/auth/login`,{
    method: "POST",
    body: JSON.stringify({ "email":process.env.NEXT_PUBLIC_BB_SERVICE_ACCOUNT,"password":process.env.NEXT_PUBLIC_BB_SERVICE_KEY,"web":true}),
    headers: {
    'Content-Type': 'application/json',
    'Accept-Encoding': 'deflate, gzip',
  },
      cache: 'no-store'
});

    const token = await res.json();
    return token.token;
}