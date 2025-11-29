import Link from "next/link";
import {
  measurePingResponse,
  type Type_MeasurePingResponse,
} from "@/app/_utils/measure-ping-response";
import { ErrorOccurredText } from "@/shared/texts";

export async function PingResponseTimeCardContent({ url }: { url: string }) {
  const results: Type_MeasurePingResponse = await measurePingResponse({
    url,
  });

  if (results.errorOccurred) {
    return <p className="text-sm mt-1 text-red-500">{ErrorOccurredText}</p>;
  }

  return (
    <>
      <div className="flex items-end font-mono mt-4 justify-center gap-x-2">
        <p className="text-3xl">{results.responseTimeMs}</p>
        <p className="text-sm">ms</p>
      </div>
      {/* Green for 200 or less */}
      {/* Yellow for 201 to 800 */}
      {/* Red for more than 800 */}
      <div className="flex mt-5 w-full relative">
        <div className="h-2 bg-green-500 rounded-l w-[20%]" />
        <div className="h-2 bg-yellow-500 w-[60%]" />
        <div className="h-2 bg-red-500 rounded-r w-[20%]" />

        {/* Marker */}
        <div
          className="w-0.5 h-4 absolute bg-black top-[50%] -translate-y-[50%] rounded"
          style={{
            left: `${results.responseTimeMs > 1000 ? 100 : results.responseTimeMs / 10}%`,
          }}
        />
      </div>
      <p className="text-xs mt-6">
        It's{" "}
        <Link
          href={"https://developers.google.com/speed/docs/insights/Server"}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          recommended
        </Link>{" "}
        to have a ping response time of 200 ms or less for optimal performance.
      </p>
    </>
  );
}
