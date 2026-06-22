import { Router } from "express";
import { SettingController } from "../controllers/setting.controller";
import { SettingService } from "../services/setting.service";
import { CustomerService } from "../services/customer.service";
import { authMiddleware } from "../middleware/auth.middleware";

class SettingRouter {
  public router: Router;
  private settingService: SettingService;
  private customerService: CustomerService;
  private settingController: SettingController;

  constructor() {
    this.router = Router();
    this.settingService = new SettingService();
    this.customerService = new CustomerService(this.settingService);
    this.settingController = new SettingController(
      this.settingService,
      this.customerService
    );
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      "/operational-hours",
      this.settingController.getOperationalHours
    );
    this.router.put(
      "/operational-hours",
      authMiddleware,
      this.settingController.updateOperationalHours
    );

    // Generic settings
    this.router.get("/:key", authMiddleware, this.settingController.getSetting);
    this.router.put(
      "/:key",
      authMiddleware,
      this.settingController.updateSetting
    );
  }
}

export default new SettingRouter().router;
