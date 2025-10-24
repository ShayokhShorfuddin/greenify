import { promises as dns } from "node:dns";
import logger from "@/logger";

type Type_getIPResponse =
  | {
      errorOccurred: true;
    }
  | {
      ip: string;
      errorOccurred: false;
    };

export async function getIP(hostname: string): Promise<Type_getIPResponse> {
  try {
    const addresses = await dns.resolve4(hostname); // dns.resolve4() returns an array because a single name can legally map to many IPv4 addresses (DNS “A” records).
    // We will only use the first one for now.
    return {
      ip: addresses[0], // e.g. '142.250.185.78'
      errorOccurred: false,
    };
  } catch (error) {
    logger.error(`Failed to resolve IP for host ${hostname}: ${error}`);
    return {
      errorOccurred: true,
    };
  }
}
