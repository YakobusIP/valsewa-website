import { prisma } from "../lib/prisma";
import { InternalServerError } from "../lib/error";
import { validateTime } from "../lib/utils";
import {
  DEFAULT_PASSWORD_EXPIRY_DAYS,
  OPERATIONAL_HOURS_KEY,
  PASSWORD_EXPIRY_DAYS_KEY,
  OperationalHours,
  UpdateOperationalHoursRequest
} from "../types/setting.type";

export class SettingService {
  getSetting = async (key: string) => {
    try {
      const setting = await prisma.globalSettings.findUnique({
        where: { key }
      });
      return setting?.value || "";
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  updateSetting = async (key: string, value: string) => {
    try {
      return await prisma.globalSettings.upsert({
        where: { key },
        update: { value },
        create: { key, value }
      });
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  getOperationalHours = async (): Promise<OperationalHours | null> => {
    const raw = await this.getSetting(OPERATIONAL_HOURS_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw);
    } catch {
      throw new InternalServerError("Invalid operational hours format");
    }
  };

  getPasswordExpiryDays = async (): Promise<number> => {
    const raw = await this.getSetting(PASSWORD_EXPIRY_DAYS_KEY);
    if (!raw) return DEFAULT_PASSWORD_EXPIRY_DAYS;

    const days = Number.parseInt(raw, 10);
    if (!Number.isFinite(days) || days < 1) {
      return DEFAULT_PASSWORD_EXPIRY_DAYS;
    }

    return days;
  };

  updateOperationalHours = async (data: UpdateOperationalHoursRequest) => {
    try {
      const { open, close, lastOrderBufferInMinutes, timezone } = data;
      validateTime(open);
      validateTime(close);

      // optional: enforce open < close
      if (open >= close) {
        throw new Error("Open time must be earlier than close time");
      }

      const payload: OperationalHours = {
        open,
        close,
        lastOrderBufferInMinutes: lastOrderBufferInMinutes ?? 30,
        timezone: timezone ?? "Asia/Jakarta"
      };

      return await this.updateSetting(
        OPERATIONAL_HOURS_KEY,
        JSON.stringify(payload)
      );
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };
}
