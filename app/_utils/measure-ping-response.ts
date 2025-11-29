import logger from "@/logger";

export type Type_MeasurePingResponse =
  | {
      errorOccurred: true;
      kind: "MeasurePingResponse";
    }
  | {
      errorOccurred: false;
      responseTimeMs: number;
      kind: "MeasurePingResponse";
    };

export async function measurePingResponse({
  url,
}: {
  url: string;
}): Promise<Type_MeasurePingResponse> {
  try {
    const t0 = performance.now(); // start timer

    await fetch(url, {
      method: "HEAD",
      mode: "no-cors",
      cache: "no-store",
    });

    const t1 = performance.now(); // end timer

    return {
      errorOccurred: false,
      responseTimeMs: Math.round(t1 - t0),
      kind: "MeasurePingResponse",
    };
  } catch (error) {
    logger.error(`Error measuring ping response time: ${error}`);

    return {
      errorOccurred: true,
      kind: "MeasurePingResponse",
    };
  }
}
