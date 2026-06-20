import pino, { Logger, LoggerOptions } from "pino";
import { env } from "./env";

export const redactPaths = [
  "req.headers.authorization",
  "req.headers.cookie",
  'req.headers["api-key"]',
  'req.headers["x-api-key"]',
  "req.body.password",
  "req.body.confirmPassword",
  "req.body.token",
  "req.body.accessToken",
  "req.body.refreshToken",
  "req.body.signature",
  "req.body.privateKey",
  "req.body.clientSecret",
  "req.body.bankAccountNo",
  "req.body.bankAccountName",
  "headers.authorization",
  "headers.cookie",
  "headers.api-key",
  'headers["x-api-key"]',
  'headers["x-signature"]',
  "body.password",
  "body.signature",
  "body.privateKey",
  "body.clientSecret",
  "body.bankAccountNo",
  "body.bankAccountName",
  "body.accessToken",
  "body.refreshToken"
];

const baseOptions: LoggerOptions = {
  level: env.LOG_LEVEL,
  timestamp: pino.stdTimeFunctions.isoTime,
  base: {
    service: "valsewa-backend",
    env: env.NODE_ENV,
    version: process.env.npm_package_version ?? "1.0.0"
  },
  redact: {
    paths: redactPaths,
    censor: "[REDACTED]"
  }
};

function createRootLogger(): Logger {
  if (env.LOG_PRETTY && env.NODE_ENV === "development") {
    return pino({
      ...baseOptions,
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname"
        }
      }
    });
  }

  return pino(baseOptions);
}

export const logger = createRootLogger();

export function createChildLogger(bindings: Record<string, unknown>): Logger {
  return logger.child(bindings);
}
