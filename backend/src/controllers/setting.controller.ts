import { Request, Response, NextFunction } from "express";
import { SettingService } from "../services/setting.service";
import { CustomerService } from "../services/customer.service";
import { BadRequestError } from "../lib/error";
import { PASSWORD_EXPIRY_DAYS_KEY } from "../types/setting.type";

export class SettingController {
  constructor(
    private readonly settingService: SettingService,
    private readonly customerService: CustomerService
  ) {}

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

      if (key === PASSWORD_EXPIRY_DAYS_KEY) {
        const newExpiryDays = Number.parseInt(value, 10);
        if (!Number.isFinite(newExpiryDays) || newExpiryDays < 1) {
          throw new BadRequestError(
            "Password expiry days must be a positive number"
          );
        }

        const previousExpiryDays =
          await this.settingService.getPasswordExpiryDays();

        if (previousExpiryDays !== newExpiryDays) {
          await this.customerService.recalculatePasswordExpiry(
            previousExpiryDays,
            newExpiryDays
          );
        }
      }

      const updated = await this.settingService.updateSetting(key, value);
      return res.json(updated);
    } catch (error) {
      return next(error);
    }
  };

  getOperationalHours = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const value = await this.settingService.getOperationalHours();
      return res.status(200).json(value);
    } catch (error) {
      return next(error);
    }
  };

  updateOperationalHours = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
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
