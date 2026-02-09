import { Router } from "express";
import { SettingController } from "../controllers/setting.controller";
import { SettingService } from "../services/setting.service";
import { authMiddleware } from "../middleware/auth.middleware";

class SettingRouter {
  public router: Router;
  private settingService: SettingService;
  private settingController: SettingController;

  constructor() {
    this.router = Router();
    this.settingService = new SettingService();
    this.settingController = new SettingController(this.settingService);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/:key", authMiddleware, this.settingController.getSetting);
    this.router.put(
      "/:key",
      authMiddleware,
      this.settingController.updateSetting
    );
  }
}

export default new SettingRouter().router;
