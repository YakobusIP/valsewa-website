import { v4 as uuidv4 } from "uuid";
import path from "path";

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
