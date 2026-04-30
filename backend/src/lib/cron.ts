import cron from "node-cron";
import { DailyDropService } from "../services/dailydrop.service";
import { getOperationalWindow } from "./operational-window";
import { prisma } from "./prisma";
import { OPERATIONAL_HOURS_KEY } from "../types/setting.type";

export async function initCronJobs() {
  const setting = await prisma.globalSettings.findUnique({
    where: { key: OPERATIONAL_HOURS_KEY }
  });

  let tz = "Asia/Jakarta";

  if (setting?.value) {
    try {
      const hours = JSON.parse(setting.value);
      if (hours.timezone) tz = hours.timezone;
    } catch {
      // fall back to defaults
    }
  }

  cron.schedule(
    "*/5 * * * *",
    async () => {
      try {
        const { start, end } = await getOperationalWindow();
        const existing = await prisma.dailyDrop.findFirst({
          where: { date: { gte: start, lte: end } },
          select: { id: true }
        });
        if (existing) {
          return;
        }

        console.log("[DailyDrop] Running daily randomizer...");
        const service = new DailyDropService();
        await service.runRandomizer();
        console.log("[DailyDrop] Randomizer completed successfully");
      } catch (err) {
        console.error("[DailyDrop] Randomizer failed:", (err as Error).message);
      }
    },
    { timezone: tz }
  );

  console.log(`[DailyDrop] Cron scheduled every 5 minutes (${tz}); randomizer runs only when no drops exist for today`);
}
