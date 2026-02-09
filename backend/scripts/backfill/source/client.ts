import { PrismaClient } from "./generated";

export const sourcePrisma = new PrismaClient({
  datasources: {
    db: { url: process.env.SOURCE_DATABASE_URL }
  }
});
