import dotenv from "dotenv";
import { z } from "zod";

dotenv.config()

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.string().transform((value) => {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) throw new Error("Server port must be a number");
    return parsed;
  })
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.format());
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
