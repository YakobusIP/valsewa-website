import { PrismaClient } from "./generated";

export const targetPrisma = new PrismaClient({
  datasources: {
    db: { url: process.env.TARGET_DATABASE_URL }
  }
});
