"use client";

//TODO We do need Suspense. Change this filename from "statistic" to something else
// TODO Connect with supabase and Try rendering a graph here
// import { PingResponseTimeCardContent } from "./PingResponseTimeCardContent";
// import { PingResponseTimeCardSkeleton } from "./PingResponseTimeCardSkeleton";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

export function Statistic({ url }: { url: string }) {
  return (
    <div className="bg-audit-card-background border border-audit-card-border rounded-lg p-3 col-span-2">
      <small className="text-neutral-700 font-mono">Info #2</small>
      <p className="text-[15px]">Bytes transferred timeline.</p>

      {/* <Suspense fallback={<PingResponseTimeCardSkeleton />}>
        <PingResponseTimeCardContent url={url} />
      </Suspense> */}
      <LineChart
        style={{ width: "100%", aspectRatio: 1.618, maxWidth: 600 }}
        responsive
        data={data}
        className="mt-8"
      >
        <CartesianGrid />
        <Line dataKey="uv" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </div>
  );
}

const data = [
  {
    name: "Page A",
    uv: 400,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 300,
    pv: 4567,
    amt: 2400,
  },
  {
    name: "Page C",
    uv: 320,
    pv: 1398,
    amt: 2400,
  },
  {
    name: "Page D",
    uv: 200,
    pv: 9800,
    amt: 2400,
  },
  {
    name: "Page E",
    uv: 278,
    pv: 3908,
    amt: 2400,
  },
  {
    name: "Page F",
    uv: 189,
    pv: 4800,
    amt: 2400,
  },
];
