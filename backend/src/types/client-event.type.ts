import { z } from "zod";

const ALLOWED_EVENT_NAMES = [
  "force_finish_dialog_opened",
  "force_finish_confirm_clicked",
  "force_finish_request_started",
  "force_finish_request_completed",
  "force_finish_request_failed",
  "client_error_boundary_triggered",
  "dashboard_viewed",
  "dashboard_orders_loaded"
] as const;

export type ClientEventName = (typeof ALLOWED_EVENT_NAMES)[number];

export const clientEventSchema = z
  .object({
    eventName: z.enum(ALLOWED_EVENT_NAMES),
    actionId: z.string().max(64).optional(),
    bookingId: z.string().max(64).optional(),
    accountId: z.number().int().positive().optional(),
    path: z.string().max(512).optional(),
    confirmDelayMs: z.number().int().min(0).optional(),
    viewportWidth: z.number().int().min(0).optional(),
    viewportHeight: z.number().int().min(0).optional(),
    metadata: z.record(z.unknown()).optional()
  })
  .strict();

export type ClientEventBody = z.infer<typeof clientEventSchema>;

const MAX_METADATA_KEYS = 20;
const MAX_STRING_LENGTH = 512;
const MAX_ARRAY_ITEMS = 10;

const sanitizePrimitive = (value: string): string =>
  value.length > MAX_STRING_LENGTH
    ? value.slice(0, MAX_STRING_LENGTH) + "...[truncated]"
    : value;

const sanitizeArray = (arr: unknown[]): unknown[] => {
  const trimmed = arr.slice(0, MAX_ARRAY_ITEMS);
  return trimmed.map((item) => {
    if (typeof item === "string") return sanitizePrimitive(item);
    if (typeof item === "number" || typeof item === "boolean") return item;
    return "[redacted]";
  });
};

const SENSITIVE_KEY_PATTERNS = [
  /token/i,
  /password/i,
  /passwd/i,
  /secret/i,
  /auth/i,
  /cookie/i,
  /session/i,
  /credential/i,
  /apikey/i,
  /api[-_]?key/i,
  /private[-_]?key/i,
  /access[-_]?key/i,
  /refresh/i,
  /bearer/i,
  /jwt/i
];

function isSensitiveKey(key: string): boolean {
  return SENSITIVE_KEY_PATTERNS.some((pattern) => pattern.test(key));
}

export function sanitizeMetadata(
  metadata: Record<string, unknown> | undefined
): Record<string, unknown> | undefined {
  if (!metadata) return undefined;

  const keys = Object.keys(metadata);
  if (keys.length > MAX_METADATA_KEYS) {
    return {};
  }

  const sanitized: Record<string, unknown> = {};
  for (const key of keys) {
    if (isSensitiveKey(key)) {
      sanitized[key] = "[redacted]";
      continue;
    }
    const value = metadata[key];
    if (typeof value === "string") {
      sanitized[key] = sanitizePrimitive(value);
    } else if (
      typeof value === "number" ||
      typeof value === "boolean" ||
      value === null
    ) {
      sanitized[key] = value;
    } else if (Array.isArray(value)) {
      sanitized[key] = sanitizeArray(value);
    } else {
      sanitized[key] = "[redacted]";
    }
  }
  return sanitized;
}
