import cron from "node-cron";
import axios, { AxiosError } from "axios";
import { randomUUID } from "crypto";
import { env } from "./env";
import { getOperationalWindow } from "./operational-window";
import { createChildLogger } from "./logger";

const cronLogger = createChildLogger({ component: "cron" });

type CronJobName =
  | "daily-drop-randomizer"
  | "update-rank"
  | "check-password-expiration"
  | "check-voucher-expiration"
  | "sync-expired"
  | "sync-completed"
  | "sync-account-availability";

export async function initCronJobs() {
  const { tz } = await getOperationalWindow();

  const jobLocks = new Map<CronJobName, boolean>();

  const runExclusive = async (name: CronJobName, fn: () => Promise<void>) => {
    if (jobLocks.get(name)) {
      cronLogger.debug(
        { event: "cron_job_skipped", job: name, reason: "lock_held" },
        "Cron job skipped due to lock"
      );
      return;
    }
    jobLocks.set(name, true);
    try {
      await fn();
    } finally {
      jobLocks.set(name, false);
    }
  };

  const postScheduler = async (path: string, correlationId: string) => {
    const base = env.BACKEND_BASE_URL.replace(/\/$/, "");
    const url = `${base}${path}`;
    const start = Date.now();

    try {
      const response = await axios.post(url, undefined, {
        headers: {
          "api-key": env.SCHEDULER_API_KEY,
          "x-correlation-id": correlationId
        },
        timeout: 60_000
      });

      return {
        statusCode: response.status,
        durationMs: Date.now() - start
      };
    } catch (error) {
      const durationMs = Date.now() - start;
      const axiosError = error as AxiosError;
      throw Object.assign(error as Error, {
        durationMs,
        statusCode: axiosError.response?.status
      });
    }
  };

  const schedule = (
    name: CronJobName,
    expr: string,
    runner: (correlationId: string) => Promise<void>
  ) => {
    cron.schedule(
      expr,
      async () => {
        await runExclusive(name, async () => {
          const correlationId = randomUUID();
          const start = Date.now();
          cronLogger.info(
            { event: "cron_job_started", job: name, correlationId },
            "Cron job started"
          );

          try {
            await runner(correlationId);
            cronLogger.info(
              {
                event: "cron_job_completed",
                job: name,
                correlationId,
                durationMs: Date.now() - start
              },
              "Cron job completed"
            );
          } catch (err) {
            const error = err as Error & {
              durationMs?: number;
              statusCode?: number;
            };
            cronLogger.error(
              {
                event: "cron_job_failed",
                job: name,
                correlationId,
                durationMs: error.durationMs ?? Date.now() - start,
                statusCode: error.statusCode,
                errorName: error.name,
                errorMessage: error.message
              },
              "Cron job failed"
            );
          }
        });
      },
      { timezone: tz }
    );
  };

  schedule("daily-drop-randomizer", "*/5 * * * *", async (correlationId) => {
    const result = await postScheduler(
      "/api/daily-drop/run-randomizer",
      correlationId
    );
    cronLogger.debug({
      event: "cron_scheduler_call",
      job: "daily-drop-randomizer",
      path: "/api/daily-drop/run-randomizer",
      correlationId,
      ...result
    });
  });

  schedule("update-rank", "0 0 * * *", async (correlationId) => {
    const result = await postScheduler("/api/accounts/update-rank", correlationId);
    cronLogger.debug({
      event: "cron_scheduler_call",
      job: "update-rank",
      path: "/api/accounts/update-rank",
      correlationId,
      ...result
    });
  });

  schedule("check-password-expiration", "*/15 * * * *", async (correlationId) => {
    const result = await postScheduler(
      "/api/customer/check-password-expiration",
      correlationId
    );
    cronLogger.debug({
      event: "cron_scheduler_call",
      job: "check-password-expiration",
      path: "/api/customer/check-password-expiration",
      correlationId,
      ...result
    });
  });

  schedule("check-voucher-expiration", "*/5 * * * *", async (correlationId) => {
    const result = await postScheduler(
      "/api/vouchers/check-expiration",
      correlationId
    );
    cronLogger.debug({
      event: "cron_scheduler_call",
      job: "check-voucher-expiration",
      path: "/api/vouchers/check-expiration",
      correlationId,
      ...result
    });
  });

  schedule("sync-expired", "*/1 * * * *", async (correlationId) => {
    const result = await postScheduler(
      "/api/bookings/sync-expired",
      correlationId
    );
    cronLogger.debug({
      event: "cron_scheduler_call",
      job: "sync-expired",
      path: "/api/bookings/sync-expired",
      correlationId,
      ...result
    });
  });

  schedule("sync-completed", "*/1 * * * *", async (correlationId) => {
    const result = await postScheduler(
      "/api/bookings/sync-completed",
      correlationId
    );
    cronLogger.debug({
      event: "cron_scheduler_call",
      job: "sync-completed",
      path: "/api/bookings/sync-completed",
      correlationId,
      ...result
    });
  });

  schedule("sync-account-availability", "*/1 * * * *", async (correlationId) => {
    const result = await postScheduler(
      "/api/bookings/sync-account-availability",
      correlationId
    );
    cronLogger.debug({
      event: "cron_scheduler_call",
      job: "sync-account-availability",
      path: "/api/bookings/sync-account-availability",
      correlationId,
      ...result
    });
  });

  cronLogger.info({ event: "cron_jobs_initialized" }, "Cron jobs initialized");
}
