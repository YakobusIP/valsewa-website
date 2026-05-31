import { NextFunction, Request, Response } from "express";
import { env } from "../lib/env";
import { getClientIp, getRoutePattern } from "../lib/http";

function resolveLogLevel(
  statusCode: number,
  durationMs: number
): "info" | "warn" | "error" {
  if (statusCode >= 500) return "error";
  if (statusCode >= 400 || durationMs >= env.SLOW_REQUEST_THRESHOLD_MS) {
    return "warn";
  }
  return "info";
}

export const httpLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const start = Date.now();

  res.on("finish", () => {
    const durationMs = Date.now() - start;
    const statusCode = res.statusCode;
    const slow = durationMs >= env.SLOW_REQUEST_THRESHOLD_MS;
    const level = resolveLogLevel(statusCode, durationMs);

    const payload = {
      event: "http_request_completed",
      requestId: req.id,
      correlationId: req.correlationId,
      method: req.method,
      route: getRoutePattern(req),
      path: req.originalUrl || req.url,
      statusCode,
      durationMs,
      contentLength: Number(res.getHeader("content-length")) || undefined,
      ip: getClientIp(req),
      userAgent: req.headers["user-agent"],
      customerId: req.customer?.id,
      adminUsername: req.adminUsername,
      isScheduler: req.isScheduler ?? false,
      slow: slow || undefined
    };

    req.log[level](payload, "HTTP request completed");
  });

  next();
};
