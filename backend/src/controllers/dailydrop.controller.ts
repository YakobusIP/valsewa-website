import { NextFunction, Request, Response } from "express";
import { DailyDropService } from "../services/dailydrop.service";

export class DailyDropController {
  constructor(private readonly dailyDropService: DailyDropService) {}

  getConfig = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.dailyDropService.getConfig();
      return res.json({ data });
    } catch (error) {
      return next(error);
    }
  };

  upsertConfig = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.dailyDropService.upsertConfig(req.body);
      return res.json({ message: "Daily Drop config saved successfully!" });
    } catch (error) {
      return next(error);
    }
  };

  triggerRandomizer = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.dailyDropService.runRandomizer();
      return res.json({ message: "Daily Drop randomizer executed successfully!" });
    } catch (error) {
      return next(error);
    }
  };

  runRandomizerScheduled = async (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result =
        await this.dailyDropService.runRandomizerIfEmptyForOperationalDay();
      if (result.skipped) {
        return res.json({
          message: "Daily Drop already present for this operational day",
          skipped: true
        });
      }
      return res.json({
        message: "Daily Drop randomizer executed successfully!",
        skipped: false
      });
    } catch (error) {
      return next(error);
    }
  };

  getAdminDrops = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.dailyDropService.getTodayDrops();
      return res.json({ data });
    } catch (error) {
      return next(error);
    }
  };

  getPublicDrops = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const drops = await this.dailyDropService.getTodayDrops();
      const data = drops.map((drop) => ({
        slot: drop.slot,
        discount: drop.discount,
        isSold: drop.isSold,
        priceList: {
          id: drop.priceList.id,
          duration: drop.priceList.duration,
          unratedPrice: drop.priceList.unratedPrice,
          compPrice: drop.priceList.compPrice
        },
        account: {
          id: drop.account.id,
          accountCode: drop.account.accountCode,
          accountRank: drop.account.accountRank,
          nickname: drop.account.nickname,
          isCompetitive: drop.account.isCompetitive,
          availabilityStatus: drop.account.availabilityStatus,
          skinCount: (drop.account as any).skinList?.length ?? 0,
          thumbnail: drop.account.thumbnail
            ? { imageUrl: drop.account.thumbnail.imageUrl }
            : null,
          priceTier: {
            id: drop.account.priceTier.id,
            code: drop.account.priceTier.code
          }
        }
      }));
      return res.json({ data });
    } catch (error) {
      return next(error);
    }
  };
}
