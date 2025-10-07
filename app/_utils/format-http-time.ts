import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

// Response type
export type Type_formatHttpTime = {
  day: string;
  date: string;
  time: string;
};

// Format the HTTP time to a more readable format
export default function formatHttpTime({
  httpTime,
}: {
  httpTime: string;
}): Type_formatHttpTime {
  const d = dayjs(httpTime).utc();

  return {
    day: d.format("dddd"), // Sunday-Saturday, The name of the day of the week
    date: d.format("DD MMM YYYY"), // 01-31, The abbreviated month name, Four-digit year
    time: `${d.format("h:mm A")} GMT`, // 2:30 AM GMT
  };
}
