export async function POST(request: Request) {
  const data = await request.json();
  console.log("Received informer data: ", data);

  const origin = request.headers.get("origin") || "*";

  const headers = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };

  return new Response("Informer API is running", {
    status: 200,
    headers,
  });
}

// Handler for the preflight request (OPTIONS)
export async function OPTIONS(request: Request) {
  const origin = request.headers.get("origin") || "*";

  const headers = {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };

  return new Response(null, { status: 204, headers }); // 204 No Content is standard for a successful OPTIONS preflight
}
