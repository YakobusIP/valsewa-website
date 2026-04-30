import { Request, Response, NextFunction } from "express";
import { SettingService } from "../services/setting.service";
import { BadRequestError } from "../lib/error";

export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  getSetting = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { key } = req.params;
      const value = await this.settingService.getSetting(key);
      return res.json({ key, value });
    } catch (error) {
      return next(error);
    }
  };

  updateSetting = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { key } = req.params;
      const { value } = req.body;

      if (typeof value !== "string") {
        throw new BadRequestError("Value must be a string");
      }

      const updated = await this.settingService.updateSetting(key, value);
      return res.json(updated);
    } catch (error) {
      return next(error);
    }
  };
  
  getOperationalHours = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const value = await this.settingService.getOperationalHours();
      return res.status(200).json(value);
    } catch (error) {
      return next(error);
    }
  };

  updateOperationalHours = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { open, close, lastOrderBufferInMinutes, timezone } = req.body;

      if (!open || !close) {
        throw new BadRequestError("Missing required fields.");
      }

      const updated = await this.settingService.updateOperationalHours({
        open,
        close,
        lastOrderBufferInMinutes,
        timezone
      });
      return res.json(updated);
    } catch (error) {
      return next(error);
    }
  };
}
