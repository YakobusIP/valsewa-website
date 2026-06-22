type OperationalHours = {
  open: string;
  close: string;
  lastOrderBufferInMinutes: number;
  timezone: string;
};

type UpdateOperationalHoursRequest = {
  open: string;
  close: string;
  lastOrderBufferInMinutes: number;
  timezone?: string;
};

export const OPERATIONAL_HOURS_KEY = "OPERATIONAL_HOURS";
export const PASSWORD_EXPIRY_DAYS_KEY = "password_expiry_days";
export const DEFAULT_PASSWORD_EXPIRY_DAYS = 30;

export type { OperationalHours, UpdateOperationalHoursRequest };
