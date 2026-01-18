import { Router } from "express";
import { VoucherController } from "../controllers/voucher.controller";
import { VoucherService } from "../services/voucher.service";
import { schedulerMiddleware } from "../middleware/scheduler.middleware";

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
    this.router.get("/", this.voucherController.getAllVouchers);
    this.router.get(
      "/active/:voucherName",
      this.voucherController.getActiveVoucherByVoucherName
    );
    this.router.post("/", this.voucherController.createVoucher);
    this.router.patch("/:id/toggle", this.voucherController.toggleVoucherStatus);
    this.router.patch(
      "/:id/toggleVisibility",
      this.voucherController.toggleVoucherVisible
    );
    this.router.post(
      "/check-expiration",
      schedulerMiddleware,
      this.voucherController.checkExpiration
    );
    this.router.delete("/:id", this.voucherController.deleteVoucher);
  }
}

export default new VoucherRouter().router;
