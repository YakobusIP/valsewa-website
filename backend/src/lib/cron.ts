import cron from "node-cron";
import axios from "axios";
import { env } from "./env";
import { getOperationalWindow } from "./operational-window";

type CronJobName =
  | "daily-drop-randomizer"
  | "update-expire-at"
  | "check-password-expiration"
  | "check-voucher-expiration"
  | "sync-expired"
  | "sync-completed"
  | "sync-account-availability";

export async function initCronJobs() {
  const { tz } = await getOperationalWindow();

  const jobLocks = new Map<CronJobName, boolean>();

  const runExclusive = async (name: CronJobName, fn: () => Promise<void>) => {
    if (jobLocks.get(name)) return;
    jobLocks.set(name, true);
    try {
      await fn();
    } finally {
      jobLocks.set(name, false);
    }
  };

  const postScheduler = async (path: string) => {
    const base = env.BACKEND_BASE_URL.replace(/\/$/, "");
    const url = `${base}${path}`;
    await axios.post(url, undefined, {
      headers: {
        "api-key": env.SCHEDULER_API_KEY
      },
      timeout: 60_000
    });
  };

  const schedule = (
    name: CronJobName,
    expr: string,
    runner: () => Promise<void>
  ) => {
    cron.schedule(
      expr,
      async () => {
        await runExclusive(name, async () => {
          try {
            await runner();
            console.log(`[Cron] ${name} completed`);
          } catch (err) {
            console.error(
              `[Cron] ${name} failed:`,
              (err as Error)?.message ?? err
            );
          }
        });
      },
      { timezone: tz }
    );
  };

  schedule("daily-drop-randomizer", "*/5 * * * *", async () => {
    await postScheduler("/api/daily-drop/run-randomizer");
  });

  schedule("update-expire-at", "0 * * * *", async () => {
    await postScheduler("/api/accounts/update-expire-at");
  });

  schedule("check-password-expiration", "*/15 * * * *", async () => {
    await postScheduler("/api/customer/check-password-expiration");
  });

  schedule("check-voucher-expiration", "*/5 * * * *", async () => {
    await postScheduler("/api/vouchers/check-expiration");
  });

  schedule("sync-expired", "*/2 * * * *", async () => {
    await postScheduler("/api/bookings/sync-expired");
  });

  schedule("sync-completed", "*/2 * * * *", async () => {
    await postScheduler("/api/bookings/sync-completed");
  });

  schedule("sync-account-availability", "*/2 * * * *", async () => {
    await postScheduler("/api/bookings/sync-account-availability");
  });
}
