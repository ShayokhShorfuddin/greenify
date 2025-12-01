import { generateUniqueId } from "@/app/_utils/generate-unique-id";
import { db } from "@/lib/db";
import { analytics } from "@/schemas/analytics-schema";

type Type_Assets = {
  url: string; // The URL of the file
  type: string; // The type of the file
  duration: number; // How long it took to download (ms)
  transferSize: number; // Bytes transferred over network
};

type Type_Payload = {
  projectId: string;
  totalTransferSize: number;
  assets: Type_Assets[];
};

export async function POST(request: Request) {
  // Handle incoming informer data
  const data = (await request.json()) as Type_Payload;

  // Connect to MongoDB and store the data
  await db.insert(analytics).values({
    id: generateUniqueId(),
    projectID: data.projectId,
    totalTransferSize: data.totalTransferSize,
    assets: data.assets,
    createdAt: new Date(),
  });

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
