export function IPToCo2IntensityCardSkeleton() {
  return (
    <>
      <div className="h-5 w-full mt-2 bg-neutral-200 rounded animate-pulse" />
      <div className="h-5 w-full mt-1 bg-neutral-200 rounded animate-pulse" />
      <div className="h-5 w-full mt-1 bg-neutral-200 rounded animate-pulse" />
      <div className="h-5 w-full mt-1 bg-neutral-200 rounded animate-pulse" />

      <div className="h-2 w-full mt-4 bg-neutral-200 rounded animate-pulse">
        <div className="h-2 w-1/3 bg-green-500 rounded animate-pulse" />
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-x-3">
          <div className="size-2 bg-green-500 rounded-full" />
          <div className="h-2 w-[3rem] bg-neutral-200 rounded animate-pulse"></div>
        </div>

        <div className="h-2 w-[2rem] bg-neutral-200 rounded animate-pulse"></div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-x-3">
          <div className="size-2 bg-neutral-400 rounded-full" />
          <div className="h-2 w-[2rem] bg-neutral-200 rounded animate-pulse"></div>
        </div>

        <div className="h-2 w-[2rem] bg-neutral-200 rounded animate-pulse"></div>
      </div>
    </>
  );
}
