import { MongoClient } from "mongodb";
import logger from "@/logger";

if (!process.env.MONGODB_URI) {
  // Throwing error for this case is okay
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI as string;
const options = {};

let client: MongoClient;

if (process.env.NODE_ENV === "development") {
  const globalWithMongo = globalThis as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    logger.info("Created MongoDB client. NODE_ENV is development.");
    globalWithMongo._mongoClient = new MongoClient(uri, options);
  }

  client = globalWithMongo._mongoClient;
} else {
  logger.info("Created MongoDB client. NODE_ENV is production.");
  client = new MongoClient(uri, options);
}

export default client;
