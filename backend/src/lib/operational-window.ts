import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { prisma } from "./prisma";
import { OPERATIONAL_HOURS_KEY } from "../types/setting.type";

dayjs.extend(utc);
dayjs.extend(timezone);

export type OperationalWindow = { start: Date; end: Date; tz: string };

export async function getOperationalWindow(): Promise<OperationalWindow> {
  const setting = await prisma.globalSettings.findUnique({
    where: { key: OPERATIONAL_HOURS_KEY }
  });

  let openH = 9, openM = 0, closeH = 22, closeM = 0;
  let tz = "Asia/Jakarta";

  if (setting?.value) {
    try {
      const hours = JSON.parse(setting.value);
      [openH, openM] = (hours.open as string).split(":").map(Number);
      [closeH, closeM] = (hours.close as string).split(":").map(Number);
      if (hours.timezone) tz = hours.timezone;
    } catch {
      // fall back to defaults
    }
  }

  const today = dayjs().tz(tz).format("YYYY-MM-DD");
  const pad = (n: number) => String(n).padStart(2, "0");

  const start = dayjs.tz(`${today} ${pad(openH)}:${pad(openM)}:00`, tz).toDate();
  const end = dayjs.tz(`${today} ${pad(closeH)}:${pad(closeM)}:00`, tz).toDate();

  return { start, end, tz };
}
