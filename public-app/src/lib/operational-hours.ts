import { OperationalHoursEntity } from "@/types/setting.type";

const DEFAULT_OPERATIONS_TZ = "Asia/Jakarta";

export type OperationalBounds = {
  tz: string;
  openMinutes: number;
  closeMinutes: number;
  lastOrderMinutes: number;
};

function getMinutesInTimezone(at: Date, tz: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).formatToParts(at);

  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  const second = Number(parts.find((p) => p.type === "second")?.value ?? 0);

  return hour * 60 + minute + second / 60;
}

export function getOperationalBounds(
  operationalHours: OperationalHoursEntity | null
): OperationalBounds | null {
  if (!operationalHours?.open || !operationalHours?.close) return null;

  const tz = operationalHours.timezone || DEFAULT_OPERATIONS_TZ;
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
  operationalHours: OperationalHoursEntity | null,
  at: Date = new Date()
): boolean {
  const bounds = getOperationalBounds(operationalHours);
  if (!bounds) return false;

  const atMinutes = getMinutesInTimezone(at, bounds.tz);

  return atMinutes < bounds.openMinutes || atMinutes > bounds.lastOrderMinutes;
}

export function getOperationalHoursLabel(
  operationalHours: OperationalHoursEntity | null
): string | null {
  const bounds = getOperationalBounds(operationalHours);
  if (!bounds || !operationalHours) return null;

  return `${operationalHours.open} – ${minutesToTimeString(bounds.lastOrderMinutes)} WIB`;
}
