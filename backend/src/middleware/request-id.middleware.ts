import { NextFunction, Request, Response } from "express";
import { randomUUID } from "crypto";
import {
  getContextLogger,
  refreshRequestLogger,
  runWithRequestContext
} from "../lib/request-context";

const MAX_ID_LENGTH = 128;
const ID_PATTERN = /^[\w\-.:+]{1,128}$/;

function firstHeaderValue(
  value: string | string[] | undefined
): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeIncomingId(
  value: string | undefined,
  fallback: string
): string {
  if (!value) return fallback;

  const trimmed = value.trim();
  if (
    trimmed.length === 0 ||
    trimmed.length > MAX_ID_LENGTH ||
    !ID_PATTERN.test(trimmed)
  ) {
    return fallback;
  }

  return trimmed;
}

export const requestIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const rawRequestId = firstHeaderValue(req.headers["x-request-id"]);
  const rawCorrelationId = firstHeaderValue(req.headers["x-correlation-id"]);

  const requestId = normalizeIncomingId(rawRequestId, randomUUID());
  const correlationId = normalizeIncomingId(
    rawCorrelationId,
    normalizeIncomingId(rawRequestId, requestId)
  );

  res.setHeader("x-request-id", requestId);
  res.setHeader("x-correlation-id", correlationId);

  runWithRequestContext({ requestId, correlationId }, () => {
    req.id = requestId;
    req.correlationId = correlationId;
    refreshRequestLogger(req);
    next();
  });
};
