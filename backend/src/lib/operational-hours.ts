import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { OperationalHours } from "../types/setting.type";

dayjs.extend(utc);
dayjs.extend(timezone);

export const WIB_TZ = "Asia/Jakarta";

export type OperationalBounds = {
  tz: string;
  openMinutes: number;
  closeMinutes: number;
  lastOrderMinutes: number;
};

export function getOperationalBounds(
  operationalHours: OperationalHours | null
): OperationalBounds | null {
  if (!operationalHours?.open || !operationalHours?.close) return null;

  const tz = operationalHours.timezone ?? WIB_TZ;
  const buffer = operationalHours.lastOrderBufferInMinutes ?? 30;

  const [openH, openM] = operationalHours.open.split(":").map(Number);
  const [closeH, closeM] = operationalHours.close.split(":").map(Number);
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;
  let lastOrderMinutes = closeMinutes - buffer;
  if (lastOrderMinutes < 0) lastOrderMinutes += 24 * 60;

  return { tz, openMinutes, closeMinutes, lastOrderMinutes };
}

export function minutesToTimeString(minutes: number): string {
  const normalized = ((minutes % (24 * 60)) + 24 * 60) % (24 * 60);
  const h = Math.floor(normalized / 60);
  const m = normalized % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function isOutsideOperationalHours(
  operationalHours: OperationalHours | null,
  at: Date = new Date()
): boolean {
  const bounds = getOperationalBounds(operationalHours);
  if (!bounds || !at) return false;

  const z = dayjs(at).tz(bounds.tz);
  const atMinutes = z.hour() * 60 + z.minute() + z.second() / 60;

  return atMinutes < bounds.openMinutes || atMinutes > bounds.lastOrderMinutes;
}

export function assertScheduledBookingWithinOperationalHours(
  operationalHours: OperationalHours | null,
  startAt: Date
): void {
  if (!operationalHours) return;

  const bounds = getOperationalBounds(operationalHours);
  if (!bounds) return;

  if (isOutsideOperationalHours(operationalHours, startAt)) {
    throw new Error(
      `Scheduled start time must be between ${operationalHours.open} and ${minutesToTimeString(bounds.lastOrderMinutes)} (${bounds.tz}).`
    );
  }
}
