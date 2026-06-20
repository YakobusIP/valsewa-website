import { v4 as uuidv4 } from "uuid";
import path from "path";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { format, isValid, parse } from "date-fns";
dayjs.extend(utc);
dayjs.extend(timezone);

import {
  WIB_TZ,
  isOutsideOperationalHours,
  assertScheduledBookingWithinOperationalHours,
  getOperationalBounds
} from "./operational-hours";

export {
  WIB_TZ,
  isOutsideOperationalHours,
  assertScheduledBookingWithinOperationalHours,
  getOperationalBounds
};
export const DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
export const DATE_FORMAT_WITH_TIMEZONE = "YYYY-MM-DDTHH:mm:ssZ";

export const generateFilename = (originalName: string) => {
  const extension = path.extname(originalName).toLowerCase();
  const uuid = uuidv4();
  return `${uuid}${extension}`;
};

export const addDays = (date: Date, daysToAdd: number) => {
  const d = new Date(date);
  d.setDate(d.getDate() + daysToAdd);
  return d;
};

export const addHours = (date: Date, hoursToAdd: number) => {
  const d = new Date(date);
  d.setTime(d.getTime() + hoursToAdd * 60 * 60 * 1000);
  return d;
};

export const addMinutes = (date: Date, minutesToAdd: number) => {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() + minutesToAdd);
  return d;
};

export const parseDurationToHours = (duration: string): number => {
  const lower = duration.toLowerCase().trim();

  const matches = Array.from(
    lower.matchAll(/(\d+(?:\.\d+)?)\s*(d|day|days|h|hr|hrs|hour|hours)\b/g)
  );

  if (matches.length === 0) {
    return 0;
  }

  return matches.reduce((total, match) => {
    const value = Number(match[1]);
    const unit = match[2];
    return total + (unit.startsWith("d") ? value * 24 : value);
  }, 0);
};

export const parseToDate = (dateStr?: string): Date | null => {
  if (!dateStr) return null;

  const parsedDate = parse(dateStr, DATE_FORMAT, new Date());
  return isValid(parsedDate) ? parsedDate : null;
};

export const parseToDateStr = (date: Date): string => {
  return format(date, DATE_FORMAT);
};

export const parseToLocalDate = (dateStr?: string): Date | null => {
  if (!dateStr) return null;

  return dayjs(dateStr).tz(WIB_TZ).toDate();
};

export const parseToLocalDateStr = (date: Date): string => {
  return dayjs(date).tz(WIB_TZ).format(DATE_FORMAT_WITH_TIMEZONE);
};
export const parseBooleanOptional = (value: unknown) => {
  if (value === undefined || value === null || value === "") return undefined;
  if (value === "true" || value === true) return true;
  if (value === "false" || value === false) return false;
  return undefined;
};

export const parseStringArray = (value: unknown) => {
  if (value === undefined || value === null) return undefined;

  const arr = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? [value]
      : [];

  const cleaned = arr
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.trim())
    .filter(Boolean);

  return cleaned.length ? cleaned : undefined;
};

export const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const validateTime = (time: string) => {
  if (!TIME_REGEX.test(time)) {
    throw new Error(`Invalid time format: ${time}. Use HH:mm`);
  }
};
