import { Suspense } from "react";
import { GreenHostCardContent } from "./GreenHostCardContent";
import { GreenHostCardSkeleton } from "./GreenHostCardSkeleton";

export default async function GreenHostCard({ url }: { url: string }) {
  return (
    <div className="bg-audit-card-background border border-audit-card-border rounded-lg p-3">
      {/* Audit number */}
      <small className="text-neutral-700 font-mono">Audit #2</small>
      <p className="text-[15px]">Green host detection.</p>

      <Suspense fallback={<GreenHostCardSkeleton />}>
        <GreenHostCardContent url={url} />
      </Suspense>
    </div>
  );
}
