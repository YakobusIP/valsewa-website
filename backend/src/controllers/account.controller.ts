import { Request, Response, NextFunction } from "express";
import { AccountService } from "../services/account.service";
import { UnprocessableEntityError } from "../lib/error";

export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  getAllAccounts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page as string;
      const limit = req.query.limit as string;

      if (!page || !limit) {
        throw new UnprocessableEntityError("Pagination query params missing!");
      }

      const [data, metadata] = await this.accountService.getAllAccounts(
        parseInt(page),
        parseInt(limit)
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

      return res.json({ data: account });
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
