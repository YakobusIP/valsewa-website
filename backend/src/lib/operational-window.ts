import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { prisma } from "./prisma";
import { OPERATIONAL_HOURS_KEY } from "../types/setting.type";

dayjs.extend(utc);
dayjs.extend(timezone);

export type OperationalWindow = { start: Date; end: Date; tz: string };
export type DropWindow = { start: Date; end: Date; tz: string };

type OperationalHoursParts = {
  openH: number;
  openM: number;
  closeH: number;
  closeM: number;
  tz: string;
  is24Hours: boolean;
};

const pad = (n: number) => String(n).padStart(2, "0");

async function loadOperationalHours(): Promise<OperationalHoursParts> {
  const setting = await prisma.globalSettings.findUnique({
    where: { key: OPERATIONAL_HOURS_KEY }
  });

  let openH = 9,
    openM = 0,
    closeH = 22,
    closeM = 0;
  let tz = "Asia/Jakarta";
  let is24Hours = false;

  if (setting?.value) {
    try {
      const hours = JSON.parse(setting.value);
      [openH, openM] = (hours.open as string).split(":").map(Number);
      [closeH, closeM] = (hours.close as string).split(":").map(Number);
      if (hours.timezone) tz = hours.timezone;
      if (hours.is24Hours === true) is24Hours = true;
    } catch {
      // fall back to defaults
    }
  }

  return { openH, openM, closeH, closeM, tz, is24Hours };
}

export async function getOperationalWindow(): Promise<OperationalWindow> {
  const { openH, openM, closeH, closeM, tz, is24Hours } =
    await loadOperationalHours();

  const today = dayjs().tz(tz).format("YYYY-MM-DD");

  if (is24Hours) {
    const start = dayjs.tz(`${today} 00:00:00`, tz).toDate();
    const end = dayjs.tz(today, tz).endOf("day").toDate();
    return { start, end, tz };
  }

  const start = dayjs
    .tz(`${today} ${pad(openH)}:${pad(openM)}:00`, tz)
    .toDate();
  const end = dayjs
    .tz(`${today} ${pad(closeH)}:${pad(closeM)}:00`, tz)
    .toDate();

  return { start, end, tz };
}

export async function getDailyDropWindow(): Promise<DropWindow> {
  const { openH, openM, tz, is24Hours } = await loadOperationalHours();

  const nowInTz = dayjs().tz(tz);

  if (is24Hours) {
    const start = nowInTz.startOf("day");
    const end = start.add(1, "day");
    return { start: start.toDate(), end: end.toDate(), tz };
  }

  const todayOpen = dayjs.tz(
    `${nowInTz.format("YYYY-MM-DD")} ${pad(openH)}:${pad(openM)}:00`,
    tz
  );
  const start = nowInTz.isBefore(todayOpen)
    ? todayOpen.subtract(1, "day")
    : todayOpen;
  const end = start.add(1, "day");

  return { start: start.toDate(), end: end.toDate(), tz };
}
