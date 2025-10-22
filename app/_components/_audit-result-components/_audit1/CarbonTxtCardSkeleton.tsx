export default function CarbonTxtCardSkeleton() {
  return (
    <>
      <div className="h-5 w-full mt-2 bg-neutral-200 rounded animate-pulse" />

      {/* Skeleton for URL */}
      <div className="h-5 w-full mt-1 bg-neutral-200 rounded animate-pulse" />

      {/* Skeleton for status message */}
      <div className="h-5 w-full mt-1 bg-neutral-200 rounded animate-pulse" />
    </>
  );
}
