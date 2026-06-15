import { NextFunction, Request, Response } from "express";
import { CustomError } from "../lib/error";
import { env } from "../lib/env";
import { getRoutePattern } from "../lib/http";
import { logger } from "../lib/logger";

export const errorMiddleware = async (
  err: CustomError,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const includeStack = env.NODE_ENV !== "production" || statusCode >= 500;

  const payload: Record<string, unknown> = {
    event: "http_request_failed",
    requestId: req.id,
    correlationId: req.correlationId,
    method: req.method,
    route: getRoutePattern(req),
    path: req.originalUrl || req.url,
    statusCode,
    errorName: err.name,
    errorMessage: err.message,
    customerId: req.customer?.id,
    adminUsername: req.adminUsername,
    isScheduler: req.isScheduler ?? false
  };

  if (includeStack && err.stack) {
    payload.stack = err.stack;
  }

  if (req.log) {
    req.log.error(payload, "HTTP request failed");
  } else {
    logger.error(payload, "HTTP request failed");
  }

  return res.status(statusCode).json({
    error: err.message
  });
};
