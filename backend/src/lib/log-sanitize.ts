import crypto from "crypto";
import { env } from "./env";

export function last4(value: string | undefined | null): string | undefined {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  const normalized = String(value);
  if (normalized.length <= 4) {
    return undefined;
  }

  return normalized.slice(-4);
}

export function hashIdentifier(
  value: string | undefined | null
): string | undefined {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  return crypto
    .createHmac("sha256", env.LOG_HASH_SECRET)
    .update(String(value))
    .digest("hex")
    .slice(0, 12);
}
