import { ObjectId } from "bson";
import client from "@/lib/db";

// TODO: ⚠️ Migrate to Supabase and Drizzle

type Resource = {
  url: string; // The URL of the file
  type: string; // The type of the file
  duration: number; // How long it took to download (ms)
  transferSize: number; // Bytes transferred over network
};

type Payload = {
  projectId: string;
  totalTransferSize: number;
  resources: Resource[];
};

type HistoryEntry = {
  totalTransferSize: number;
  resources: Resource[];
  timestamp: Date;
};

interface Project extends Document {
  _id: ObjectId;
  history: HistoryEntry[];
}

export async function POST(request: Request) {
  // Handle incoming informer data
  const data = (await request.json()) as Payload;

  // Connect to MongoDB and store the data
  const projectsCollection = client
    .db("Greenify")
    .collection<Project>("projects");

  await projectsCollection.updateOne(
    { _id: new ObjectId(data.projectId) },
    {
      $push: {
        history: {
          totalTransferSize: data.totalTransferSize,
          resources: data.resources,
          timestamp: new Date(),
        },
      },
    },
    { upsert: true },
  );

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
