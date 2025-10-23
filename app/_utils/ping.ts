import logger from "@/logger";

type Type_PingResult =
  | {
      errorOccurred: true;
    }
  | {
      errorOccurred: false;
      status: number;
    };

// Utility function to ping a URL and return status
export async function pingUrl(url: string): Promise<Type_PingResult> {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return {
      errorOccurred: false,
      status: response.status,
    };
  } catch (error) {
    logger.error(`Error pinging URL ${url}: ${error}`);
    return {
      errorOccurred: true,
    };
  }
}
