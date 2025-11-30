"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function BytesStatisticsContent({
  analyticsData,
}: {
  analyticsData: {
    timestamp: Date;
    totalBytesTransferred: number;
  }[];
}) {
  const chartData = analyticsData.map((item) => {
    const date = new Date(item.timestamp);
    const hour = date.getHours();
    const minute = date.getMinutes();

    return {
      hour: hour + minute / 60, // Convert to decimal hours for precise plotting
      hourLabel: `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`,
      bytes: item.totalBytesTransferred,
    };
  });

  // TODO Technically, it's just the plot for the last 24 hours
  // We need allow users to select different time ranges

  return (
    <LineChart
      style={{ aspectRatio: 1.618 }}
      responsive
      data={chartData}
      className="mt-6 w-full max-h-52 text-xs"
    >
      <CartesianGrid />
      <Line dataKey="bytes" stroke="#10b981" strokeWidth={2} />
      <XAxis
        dataKey="hour"
        type="number"
        domain={[0, 24]}
        ticks={[0, 3, 6, 9, 12, 15, 18, 21, 24]}
        tickFormatter={(value) =>
          `${Math.floor(value).toString().padStart(2, "0")}:00`
        }
      />
      <YAxis />
      <Tooltip content={CustomTooltip} active />
    </LineChart>
  );
}

function CustomTooltip({ payload, active }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded border border-greenify-card-border">
        <p>Bytes: {payload[0].payload.bytes}</p>
      </div>
    );
  }
}

// We get stuff like these in the payload array
// color : "#10b981"
// dataKey : "bytes"
// fill : "#fff"
// hide : false
// name : "bytes"
// nameKey : undefined
// payload : {hour: 12.95, hourLabel: '12:57', bytes: 1243}
// stroke : "#10b981"
// strokeWidth : 2
// type : undefined
// unit : undefined
// value : 1243
