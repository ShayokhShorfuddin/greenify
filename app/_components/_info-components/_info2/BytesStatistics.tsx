import { eq } from "drizzle-orm";
import { Suspense } from "react";
import { getDB } from "@/lib/db";
import logger from "@/logger";
import { analytics } from "@/schemas/analytics-schema";
import { BytesStatisticsContent } from "./BytesStatisticsContent";
import { BytesStatisticsSkeleton } from "./BytesStatisticsSkeleton";

// TODO Connect with supabase and Try rendering a graph here

export async function BytesStatistics({ projectId }: { projectId: string }) {
  let analyticsData: {
    timestamp: Date;
    totalBytesTransferred: number;
  }[];

  try {
    const db = getDB();
    analyticsData = await db
      .select({
        timestamp: analytics.createdAt,
        totalBytesTransferred: analytics.totalTransferSize,
      })
      .from(analytics)
      .where(eq(analytics.projectID, projectId));
  } catch (e) {
    logger.error(
      `Error fetching analytics data for project ${projectId}: ${e}`,
    );
    // TODO Style it. Trigger it by intentionally throwing an error in the try block
    return <p>Error loading analytics data.</p>;
  }

  return (
    <div className="bg-greenify-card-background border border-greenify-card-border rounded-lg p-3 col-span-2">
      <small className="text-neutral-700 font-mono">Info #2</small>
      <p className="text-[15px]">Bytes transferred timeline.</p>

      <Suspense fallback={<BytesStatisticsSkeleton />}>
        <BytesStatisticsContent analyticsData={analyticsData} />
      </Suspense>
    </div>
  );
}
