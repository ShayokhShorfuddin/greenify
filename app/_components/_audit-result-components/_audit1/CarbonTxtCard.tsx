import { Suspense } from "react";
import { CarbonTxtCardContent } from "./CarbonTxtCardContent";
import { CarbonTxtCardSkeleton } from "./CarbonTxtCardSkeleton";

export default async function CarbonTxtCard({ url }: { url: string }) {
  // Add 3 second artificial delay for demo purposes
  await new Promise((resolve) => setTimeout(resolve, 3000));

  return (
    <div className="relative bg-audit-card-background border border-audit-card-border rounded-lg p-3">
      {/* Audit number */}
      <small className="text-neutral-700 font-mono">Audit #1</small>
      <p className="text-[15px]">Carbon.txt file examination.</p>

      <Suspense fallback={<CarbonTxtCardSkeleton />}>
        <CarbonTxtCardContent url={url} />
      </Suspense>
    </div>
  );
}
