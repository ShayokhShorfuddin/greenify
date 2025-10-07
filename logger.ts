import { existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import winston from "winston";

const { combine, timestamp, align, printf } = winston.format;

// Required to check the environment we are in
const isInDevelopment = process.env.NODE_ENV === "development";

// Define the log format
const logFormat = combine(
  timestamp({
    format: "DD-MM-YYYY hh:mm:ss.SSS A",
  }),
  align(),
  printf((info) => `[${info.timestamp}] ${info.level}${info.message}`),
);

// For serverless environments like Vercel, we output to console rather than files
const transports: winston.transport[] = [
  new winston.transports.Console({ format: logFormat }),
];

// Only use file logging in development
if (isInDevelopment) {
  const logDir = join(process.cwd(), "logs");
  if (!existsSync(logDir)) mkdirSync(logDir); // create once, locally

  transports.push(
    new winston.transports.File({
      filename: "standard.log",
      dirname: logDir,
    }),
  );
}

// Initialize the logger
const logger = winston.createLogger({
  level: "info",
  format: logFormat,
  transports,
  /* exception & rejection handlers also need the same guard */
  exceptionHandlers: isInDevelopment
    ? [
        new winston.transports.File({
          filename: "exceptions.log",
          dirname: join(process.cwd(), "logs"),
        }),
      ]
    : undefined,
  rejectionHandlers: isInDevelopment
    ? [
        new winston.transports.File({
          filename: "rejections.log",
          dirname: join(process.cwd(), "logs"),
        }),
      ]
    : undefined,
});

export default logger;
