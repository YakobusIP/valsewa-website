import { prisma } from "../lib/prisma";
import { InternalServerError } from "../lib/error";

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
}
