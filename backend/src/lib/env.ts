import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "staging"]),
  PORT: z.string().transform((value) => {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) throw new Error("Server port must be a number");
    return parsed;
  }),
  ENABLE_THROTTLE: z
    .string()
    .transform((value) => value === "true")
    .optional(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
  ACCESS_TOKEN_DURATION: z.string(),
  REFRESH_TOKEN_DURATION: z.string(),

  GCS_BUCKET_NAME: z.string(),

  GCP_PROJECT_ID: z.string().optional(),
  GOOGLE_APPLICATION_CREDENTIALS: z.string().optional(),

  PUB_ACCESS_TOKEN_SECRET: z.string(),
  PUB_REFRESH_TOKEN_SECRET: z.string(),
  PUB_ACCESS_TOKEN_DURATION: z.string(),
  PUB_REFRESH_TOKEN_DURATION: z.string(),

  ADMIN_APP_URL: z.string().url(),
  CANONICAL_PUBLIC_APP_URL: z.string().url(),
  PUBLIC_APP_URL: z.string().url(),
  BACKEND_BASE_URL: z.string().url(),

  HENRIKDEV_API_KEY: z.string(),
  BULL_REDIS_IP: z.string(),
  BULL_REDIS_PORT: z.string().transform((value) => {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) throw new Error("Redis port must be a number");
    return parsed;
  }),

  SCHEDULER_API_KEY: z.string(),

  SNAP_BI_MERCHANT_ID: z.string(),
  SNAP_BI_CLIENT_ID: z.string(),
  SNAP_BI_PRIVATE_KEY: z.string(),
  SNAP_BI_CLIENT_SECRET: z.string(),
  SNAP_BI_PARTNER_ID: z.string(),
  SNAP_BI_CHANNEL_ID: z.string(),
  SNAP_BI_PUBLIC_KEY: z.string(),

  BOOKING_HOLD_TIME_MINUTES: z
    .string()
    .optional()
    .transform((value) => {
      const parsed = parseInt(value ?? "15", 10);
      if (isNaN(parsed)) throw new Error("Booking hold time must be a number");
      return parsed;
    }),
  BOOKING_GRACE_TIME_MILLIS: z
    .string()
    .optional()
    .transform((value) => {
      const parsed = parseInt(value ?? "30000", 10);
      if (isNaN(parsed)) throw new Error("Booking grace time must be a number");
      return parsed;
    })
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.format());
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
