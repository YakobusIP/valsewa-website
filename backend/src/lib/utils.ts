import { v4 as uuidv4 } from "uuid";
import path from "path";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { format, isValid, parse } from "date-fns";

dayjs.extend(utc);
dayjs.extend(timezone);

export const WIB_TZ = "Asia/Jakarta";
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
  d.setHours(d.getHours() + hoursToAdd);
  return d;
};

export const addMinutes = (date: Date, minutesToAdd: number) => {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() + minutesToAdd);
  return d;
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
