type OperationalHours = {
  open: string;
  close: string;
  lastOrderBufferInMinutes: number;
  timezone: string;
};

type UpdateOperationalHoursRequest = {
  open: string;
  close: string;
  lastOrderBufferInMinutes?: number;
  timezone?: string;
};

export const OPERATIONAL_HOURS_KEY = "OPERATIONAL_HOURS";

export type { OperationalHours, UpdateOperationalHoursRequest };
