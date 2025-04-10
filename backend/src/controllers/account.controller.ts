import { Request, Response, NextFunction } from "express";
import { AccountService } from "../services/account.service";
import { UnprocessableEntityError } from "../lib/error";
import { RankService } from "../services/rank.service";
import { Prisma } from "@prisma/client";
import { updateAllAccountRankQueue } from "../lib/queues/accountrank.queue";

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

  getAllPublicAccounts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const page = req.query.page as string;
      const limit = req.query.limit as string;
      const query = req.query.q as string;
      const sortBy = req.query.sortBy as string;
      const direction = req.query.direction as Prisma.SortOrder;

      if (!page || !limit) {
        throw new UnprocessableEntityError("Pagination query params missing!");
      }

      const [data, metadata] = await this.accountService.getAllPublicAccounts(
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

  getAccountDuplicate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const nickname = `${req.params.name}#${req.params.tag}`;
      const exists = await this.accountService.getAccountDuplicate(
        nickname,
        req.params.code
      );
      return res.json({ exists });
    } catch (error) {
      return next(error);
    }
  };

  getFailedAccountJobs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const failedJobs = await updateAllAccountRankQueue.getFailed();

      const failedIds = failedJobs.flatMap((job) => job.data.id);

      const failedAccounts = await this.accountService.getAllDatabaseAccounts({
        id: { in: failedIds }
      });

      const accountMap = new Map(
        failedAccounts.map((account) => [account.id, account])
      );

      const formattedJobs = failedJobs.map((job) => {
        const account = accountMap.get(job.data.id);
        return {
          id: job.id,
          data: job.data,
          failedReason: job.failedReason,
          timestamp: job.timestamp,
          accountCode: account ? account.accountCode : null,
          username: account ? account.username : null
        };
      });

      return res.json(formattedJobs);
    } catch (error) {
      return next(error);
    }
  };

  getAccountResetLogs = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const accounts = await this.accountService.getAccountResetLogs();

      return res.json(accounts);
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

  finishBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.accountService.finishBooking(parseInt(req.params.id));

      return res.status(201).json({ message: "Booking finished!" });
    } catch (error) {
      return next(error);
    }
  };

  updateAccount = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const deleteResetLogs =
        req.query.deleteResetLogs !== undefined
          ? req.query.deleteResetLogs === "true"
          : undefined;

      await this.accountService.updateAccount(
        parseInt(req.params.id),
        req.body,
        deleteResetLogs
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
      const accounts = await this.accountService.getAllDatabaseAccounts();

      await updateAllAccountRankQueue.clean(0, "failed");

      accounts.forEach((account) => {
        updateAllAccountRankQueue.add(
          {
            id: account.id,
            nickname: account.nickname
          },
          {
            removeOnComplete: true,
            removeOnFail: false
          }
        );
      });

      return res.json({
        message: `${accounts.length} account(s) updated successfully!`
      });
    } catch (error) {
      return next(error);
    }
  };

  updateExpireAt = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.accountService.updateExpireAt();

      return res.status(200).end();
    } catch (error) {
      return next(error);
    }
  };

  updateResetLogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.accountService.updateResetLogs(
        parseInt(req.params.id),
        req.body
      );

      return res.status(201).json({ message: "Reset account successful!" });
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
