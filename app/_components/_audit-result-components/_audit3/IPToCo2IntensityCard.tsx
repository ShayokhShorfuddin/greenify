import { Suspense } from "react";
import { IPToCo2IntensityCardContent } from "./IPToCo2IntensityCardContent";
import { IPToCo2IntensityCardSkeleton } from "./IPToCo2IntensityCardSkeleton";

export default async function IPToCo2Intensity({ url }: { url: string }) {
  return (
    <div className="relative bg-audit-card-background border border-audit-card-border rounded-lg p-3">
      {/* Audit number */}
      <small className="text-neutral-700 font-mono">Audit #3</small>
      <p className="text-[15px]">
        IP to CO<sub>2</sub> intensity.
      </p>

      <Suspense fallback={<IPToCo2IntensityCardSkeleton />}>
        <IPToCo2IntensityCardContent url={url} />
      </Suspense>
    </div>
  );
}
