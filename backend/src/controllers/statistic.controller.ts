import { Request, Response, NextFunction } from "express";
import { StatisticService } from "../services/statistic.service";

/**
 * @openapi
 * components:
 *   schemas:
 *     Statistic:
 *       type: object
 *       properties:
 *         rentedRatio:
 *           type: number
 *           description: Percentage ratio of accounts currently in use.
 *         availableAccounts:
 *           type: number
 *           description: Number of accounts available.
 *         inUseAccounts:
 *           type: number
 *           description: Number of accounts in use.
 *         totalAccounts:
 *           type: number
 *           description: Total number of accounts.
 */

export class StatisticController {
  constructor(private readonly statisticService: StatisticService) {}

  /**
   * @openapi
   * /api/statistics:
   *   get:
   *     tags:
   *       - Statistics
   *     summary: Retrieve account statistics.
   *     security:
   *       - bearerAuth: []
   *     description: Returns statistics on account availability and calculates the rented ratio.
   *     responses:
   *       200:
   *         description: Statistics successfully retrieved.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Statistic'
   */
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await this.statisticService.getAll();

      return res.json({ ...data });
    } catch (error) {
      return next(error);
    }
  };
}
