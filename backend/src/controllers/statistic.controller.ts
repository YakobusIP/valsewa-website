import { Request, Response, NextFunction } from "express";
import { StatisticService } from "../services/statistic.service";

export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.statisticService.getAll();

      return res.json({ ...data });
    } catch (error) {
      return next(error);
    }
  };
}
