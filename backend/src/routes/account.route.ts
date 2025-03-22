import { Router } from "express";
import { AccountService } from "../services/account.service";
import { AccountController } from "../controllers/account.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { UploadService } from "../services/upload.service";
import { RankService } from "../services/rank.service";
import { schedulerMiddleware } from "../middleware/scheduler.middleware";

class AccountRouter {
  public router: Router;
  private accountService: AccountService;
  private rankService: RankService;
  private accountController: AccountController;

  constructor() {
    this.router = Router();
    this.accountService = new AccountService(new UploadService());
    this.rankService = new RankService();
    this.accountController = new AccountController(
      this.accountService,
      this.rankService
    );
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.accountController.getAllAccounts);
    this.router.get("/public", this.accountController.getAllPublicAccounts);
    this.router.get(
      "/failed-jobs",
      authMiddleware,
      this.accountController.getFailedAccountJobs
    );
    this.router.get(
      "/rank/:name/:tag",
      authMiddleware,
      this.accountController.getAccountRank
    );
    this.router.get(
      "/duplicate/:name/:tag/:code",
      authMiddleware,
      this.accountController.getAccountDuplicate
    );
    this.router.get(
      "/reset-logs",
      authMiddleware,
      this.accountController.getAccountResetLogs
    );
    this.router.get("/:id", this.accountController.getAccountById);
    this.router.post("/", authMiddleware, this.accountController.createAccount);
    this.router.post(
      "/update-rank",
      schedulerMiddleware,
      this.accountController.updateAllAccountsRank
    );
    this.router.post(
      "/update-expire-at",
      schedulerMiddleware,
      this.accountController.updateExpireAt
    );
    this.router.put(
      "/reset-logs/:id",
      authMiddleware,
      this.accountController.updateResetLogs
    );
    this.router.put(
      "/:id",
      authMiddleware,
      this.accountController.updateAccount
    );
    this.router.delete(
      "/",
      authMiddleware,
      this.accountController.deleteManyAccounts
    );
  }
}

export default new AccountRouter().router;
