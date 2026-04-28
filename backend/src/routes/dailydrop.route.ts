import { Router } from "express";
import { DailyDropController } from "../controllers/dailydrop.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { DailyDropService } from "../services/dailydrop.service";

class DailyDropRouter {
  public router: Router;
  private dailyDropService: DailyDropService;
  private dailyDropController: DailyDropController;

  constructor() {
    this.router = Router();
    this.dailyDropService = new DailyDropService();
    this.dailyDropController = new DailyDropController(this.dailyDropService);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/public", this.dailyDropController.getPublicDrops);
    this.router.get(
      "/admin",
      authMiddleware,
      this.dailyDropController.getAdminDrops
    );
    this.router.get(
      "/config",
      authMiddleware,
      this.dailyDropController.getConfig
    );
    this.router.post(
      "/config",
      authMiddleware,
      this.dailyDropController.upsertConfig
    );
    this.router.post(
      "/trigger",
      authMiddleware,
      this.dailyDropController.triggerRandomizer
    );
  }
}

export default new DailyDropRouter().router;
