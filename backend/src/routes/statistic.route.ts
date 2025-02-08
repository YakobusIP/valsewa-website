import { Router } from "express";
import { StatisticService } from "../services/statistic.service";
import { StatisticController } from "../controllers/statistic.controller";
import { authMiddleware } from "../middleware/auth.middleware";

class StatisticRouter {
  public router: Router;
  private statisticService: StatisticService;
  private statisticController: StatisticController;

  constructor() {
    this.router = Router();
    this.statisticService = new StatisticService();
    this.statisticController = new StatisticController(this.statisticService);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", authMiddleware, this.statisticController.getAll);
  }
}

export default new StatisticRouter().router;
