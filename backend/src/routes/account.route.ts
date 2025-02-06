import { Router } from "express";
import { AccountService } from "../services/account.service";
import { AccountController } from "../controllers/account.controller";

class AccountRouter {
  public router: Router;
  private accountService: AccountService;
  private accountController: AccountController;

  constructor() {
    this.router = Router();
    this.accountService = new AccountService();
    this.accountController = new AccountController(this.accountService);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", this.accountController.getAllAccounts);
    this.router.get("/:id", this.accountController.getAccountById);
    this.router.post("/", this.accountController.createAccount);
    this.router.put("/:id", this.accountController.updateAccount);
    this.router.delete("/", this.accountController.deleteManyAccounts);
  }
}

export default new AccountRouter().router;
