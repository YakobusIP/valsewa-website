import cron from "node-cron";
import { DailyDropService } from "../services/dailydrop.service";
import { prisma } from "./prisma";
import { OPERATIONAL_HOURS_KEY } from "../types/setting.type";

export async function initCronJobs() {
  const setting = await prisma.globalSettings.findUnique({
    where: { key: OPERATIONAL_HOURS_KEY }
  });

  let hour = 9, minute = 0, tz = "Asia/Jakarta";

  if (setting?.value) {
    try {
      const hours = JSON.parse(setting.value);
      [hour, minute] = (hours.open as string).split(":").map(Number);
      if (hours.timezone) tz = hours.timezone;
    } catch {
      // fall back to defaults
    }
  }

  cron.schedule(
    `${minute} ${hour} * * *`,
    async () => {
      console.log("[DailyDrop] Running daily randomizer...");
      try {
        const service = new DailyDropService();
        await service.runRandomizer();
        console.log("[DailyDrop] Randomizer completed successfully");
      } catch (err) {
        console.error("[DailyDrop] Randomizer failed:", (err as Error).message);
      }
    },
    { timezone: tz }
  );

  console.log(`[DailyDrop] Cron scheduled at ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} ${tz} daily`);
}
