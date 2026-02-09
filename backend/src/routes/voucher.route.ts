import { Router } from "express";
import { VoucherController } from "../controllers/voucher.controller";
import { VoucherService } from "../services/voucher.service";
import { schedulerMiddleware } from "../middleware/scheduler.middleware";
import { authMiddleware } from "../middleware/auth.middleware";
import { customerMiddleware } from "../middleware/customer.middleware";

class VoucherRouter {
  public router: Router;
  private voucherService: VoucherService;
  private voucherController: VoucherController;

  constructor() {
    this.router = Router();
    this.voucherService = new VoucherService();
    this.voucherController = new VoucherController(this.voucherService);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", authMiddleware, this.voucherController.getAllVouchers);
    this.router.get(
      "/active",
      customerMiddleware,
      this.voucherController.getActiveVouchers
    );
    this.router.get(
      "/active/:voucherName",
      customerMiddleware,
      this.voucherController.getActiveVoucherByVoucherName
    );
    this.router.post("/", authMiddleware, this.voucherController.createVoucher);
    this.router.patch(
      "/:id/toggle",
      authMiddleware,
      this.voucherController.toggleVoucherStatus
    );
    this.router.patch(
      "/:id/toggleVisibility",
      authMiddleware,
      this.voucherController.toggleVoucherVisible
    );
    this.router.post(
      "/check-expiration",
      schedulerMiddleware,
      this.voucherController.checkExpiration
    );
    this.router.delete(
      "/:id",
      authMiddleware,
      this.voucherController.deleteVoucher
    );
  }
}

export default new VoucherRouter().router;
