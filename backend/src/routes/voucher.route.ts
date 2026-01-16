import { Router } from "express";
import { VoucherController } from "../controllers/voucher.controller";
import { VoucherService } from "../services/voucher.service";
import { schedulerMiddleware } from "../middleware/scheduler.middleware";

const router = Router();

const service = new VoucherService();
const controller = new VoucherController(service);

router.get("/", controller.getAllVouchers);
router.get("/active/:voucherName", controller.getActiveVoucherByVoucherName);
router.post("/", controller.createVoucher);
router.patch("/:id/toggle", controller.toggleVoucherStatus);
router.patch("/:id/toggleVisibility", controller.toggleVoucherVisible);
router.post("/check-expiration", schedulerMiddleware, controller.checkExpiration);
router.delete("/:id", controller.deleteVoucher);

export default router;
