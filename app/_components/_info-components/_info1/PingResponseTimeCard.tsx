import { Suspense } from "react";
import { PingResponseTimeCardContent } from "./PingResponseTimeCardContent";
import { PingResponseTimeCardSkeleton } from "./PingResponseTimeCardSkeleton";

export default async function PingResponseTimeCard({ url }: { url: string }) {
  return (
    <div className="relative bg-audit-card-background border border-audit-card-border rounded-lg p-3">
      <small className="text-neutral-700 font-mono">Info #1</small>
      <p className="text-[15px]">Ping response time.</p>

      <Suspense fallback={<PingResponseTimeCardSkeleton />}>
        <PingResponseTimeCardContent url={url} />
      </Suspense>
    </div>
  );
}
