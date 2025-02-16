import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
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

  ADMIN_APP_URL: z.string().url(),
  CANONICAL_PUBLIC_APP_URL: z.string().url(),
  PUBLIC_APP_URL: z.string().url(),

  HENRIKDEV_API_KEY: z.string()
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.format());
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
