import { eq } from "drizzle-orm";
import { Suspense } from "react";
import { db } from "@/lib/db";
import logger from "@/logger";
import { analytics } from "@/schemas/analytics-schema";
import { BytesStatisticsContent } from "./BytesStatisticsContent";
import { BytesStatisticsSkeleton } from "./BytesStatisticsSkeleton";

export async function BytesStatistics({ projectId }: { projectId: string }) {
  let analyticsData: {
    timestamp: Date;
    totalBytesTransferred: number;
  }[];

  try {
    analyticsData = await db
      .select({
        timestamp: analytics.createdAt,
        totalBytesTransferred: analytics.totalTransferSize,
      })
      .from(analytics)
      .where(eq(analytics.projectID, projectId));
  } catch (e) {
    // TODO call sentry here
    logger.error(
      `Error fetching analytics data for project ${projectId}: ${e}`,
    );
    return (
      <div className="bg-greenify-card-background border border-greenify-card-border rounded-lg p-3 col-span-1 sm:col-span-2">
        <small className="text-neutral-700 font-mono">Info #2</small>
        <p className="text-[15px]">Bytes transferred timeline.</p>

        <p className="text-red-500 mt-2">
          Failed to load analytics data.
          <br />
          We are looking into it. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-greenify-card-background border border-greenify-card-border rounded-lg p-3 col-span-1 sm:col-span-2">
      <small className="text-neutral-700 font-mono">Info #2</small>
      <p className="text-[15px]">Bytes transferred timeline.</p>

      {/* Don't render chart if data is empty */}
      {analyticsData.length === 0 ? (
        <p className="text-red-500 mt-2 text-sm">
          No bytes transfer data available for this project.
        </p>
      ) : (
        <Suspense fallback={<BytesStatisticsSkeleton />}>
          <BytesStatisticsContent analyticsData={analyticsData} />
        </Suspense>
      )}
    </div>
  );
}
