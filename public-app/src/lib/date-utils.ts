import { format } from "date-fns";
import { enUS } from "date-fns/locale";

const BOOKING_DATETIME_FORMAT = "MMM d, yyyy 'At' h:mm a";

export function formatDateToDateStr(
  date: Date | string | null | undefined
): string {
  if (!date) return "";

  const dateObj = typeof date === "string" ? new Date(date) : date;
  if (isNaN(dateObj.getTime())) return "";

  return `${format(dateObj, BOOKING_DATETIME_FORMAT, { locale: enUS })}`;
}
