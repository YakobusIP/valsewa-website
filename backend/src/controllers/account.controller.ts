import { Request, Response, NextFunction } from "express";
import { AccountService } from "../services/account.service";
import { UnprocessableEntityError } from "../lib/error";
import { RankService } from "../services/rank.service";
import { Prisma } from "@prisma/client";

export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly rankService: RankService
  ) {}

  getAllAccounts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page as string;
      const limit = req.query.limit as string;
      const query = req.query.q as string;
      const sortBy = req.query.sortBy as string;
      const direction = req.query.direction as Prisma.SortOrder;

      if (!page || !limit) {
        throw new UnprocessableEntityError("Pagination query params missing!");
      }

      const [data, metadata] = await this.accountService.getAllAccounts(
        parseInt(page),
        parseInt(limit),
        query,
        sortBy,
        direction
      );

      return res.json({ data, metadata });
    } catch (error) {
      return next(error);
    }
  };

  getAccountById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const account = await this.accountService.getAccountById(
        parseInt(req.params.id)
      );

      return res.json({ ...account });
    } catch (error) {
      return next(error);
    }
  };

  getAccountRank = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const rankResponse = await this.rankService.getSingleAccountRank(
        req.params.name,
        req.params.tag
      );

      const data = rankResponse?.data;

      return res.json({
        name: data?.name,
        tag: data?.tag,
        currentRank: data?.current_data.currenttierpatched
      });
    } catch (error) {
      return next(error);
    }
  };

  createAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.accountService.createAccount(req.body);

      return res.status(201).json({ message: "Account created successfully!" });
    } catch (error) {
      return next(error);
    }
  };

  updateAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.accountService.updateAccount(
        parseInt(req.params.id),
        req.body
      );

      return res.status(201).json({ message: "Account updated successfully!" });
    } catch (error) {
      return next(error);
    }
  };

  updateAllAccountsRank = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const length = await this.rankService.updateAllAccountsRank();

      return res.json({
        message: `${length} account(s) updated successfully!`
      });
    } catch (error) {
      return next(error);
    }
  };

  updateAllTotalRankHour = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const length = await this.accountService.updateAllTotalRentHour();

      return res.json({
        message: `${length} account(s) updated successfully!`
      });
    } catch (error) {
      return next(error);
    }
  };

  deleteManyAccounts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await this.accountService.deleteManyAccounts(req.body.ids);

      return res.status(204).end();
    } catch (error) {
      return next(error);
    }
  };
}
