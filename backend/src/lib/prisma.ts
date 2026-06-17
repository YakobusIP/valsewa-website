import { Prisma, PrismaClient } from "@prisma/client";
import { env } from "./env";
import { getContextLogger } from "./request-context";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient<Prisma.PrismaClientOptions, "query" | "error" | "warn">;
};

const prismaLog =
  env.NODE_ENV === "production"
    ? [
        { emit: "event" as const, level: "error" as const },
        { emit: "event" as const, level: "warn" as const },
        { emit: "event" as const, level: "query" as const }
      ]
    : [
        { emit: "event" as const, level: "query" as const },
        { emit: "event" as const, level: "error" as const },
        { emit: "event" as const, level: "warn" as const }
      ];

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient<Prisma.PrismaClientOptions, "query" | "error" | "warn">({
    log: prismaLog
  });

const prismaLogger = () => getContextLogger({ component: "prisma" });

function parseQueryOperation(query: string): string {
  const match = query.match(/^(SELECT|INSERT|UPDATE|DELETE|BEGIN|COMMIT)/i);
  return match?.[1]?.toUpperCase() ?? "UNKNOWN";
}

function parseQueryModel(query: string): string | undefined {
  const fromMatch = query.match(/FROM\s+"public"\."(\w+)"/i);
  if (fromMatch) return fromMatch[1];
  const intoMatch = query.match(/INTO\s+"public"\."(\w+)"/i);
  if (intoMatch) return intoMatch[1];
  const updateMatch = query.match(/UPDATE\s+"public"\."(\w+)"/i);
  if (updateMatch) return updateMatch[1];
  return undefined;
}

function shouldLogQueryText(): boolean {
  return env.NODE_ENV !== "production" && env.LOG_LEVEL === "debug";
}

prisma.$on("query", (event: Prisma.QueryEvent) => {
  const durationMs = event.duration;
  const isSlow = durationMs >= env.SLOW_DB_QUERY_THRESHOLD_MS;
  const operation = parseQueryOperation(event.query);
  const model = parseQueryModel(event.query);

  const fields: Record<string, unknown> = {
    durationMs,
    model,
    operation,
    target: event.target
  };

  if (shouldLogQueryText()) {
    fields.query = event.query;
  }

  if (isSlow) {
    prismaLogger().warn(
      { event: "slow_db_query", slow: true, ...fields },
      "Slow database query"
    );
    return;
  }

  if (env.NODE_ENV !== "production" && env.LOG_LEVEL === "debug") {
    prismaLogger().debug({ event: "db_query", ...fields }, "Database query");
  }
});

prisma.$on("error", (event: Prisma.LogEvent) => {
  prismaLogger().error(
    {
      event: "db_error",
      errorMessage: event.message,
      target: event.target
    },
    "Database error"
  );
});

prisma.$on("warn", (event: Prisma.LogEvent) => {
  prismaLogger().warn(
    {
      event: "db_warn",
      errorMessage: event.message,
      target: event.target
    },
    "Database warning"
  );
});

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
