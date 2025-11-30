import { Suspense } from "react";
import { PingResponseTimeCardContent } from "./PingResponseTimeCardContent";
import { PingResponseTimeCardSkeleton } from "./PingResponseTimeCardSkeleton";

export async function PingResponseTimeCard({ url }: { url: string }) {
  return (
    <div className="bg-greenify-card-background border border-greenify-card-border rounded-lg p-3">
      <small className="text-neutral-700 font-mono">Info #1</small>
      <p className="text-[15px]">Ping response time.</p>

      <Suspense fallback={<PingResponseTimeCardSkeleton />}>
        <PingResponseTimeCardContent url={url} />
      </Suspense>
    </div>
  );
}
