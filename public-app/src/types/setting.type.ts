export type OperationalHoursEntity = {
  open: string;
  close: string;
  lastOrderBufferInMinutes: number;
  timezone: string;
  is24Hours?: boolean;
};
