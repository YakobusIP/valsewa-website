import { Router } from "express";
import { VoucherController } from "../controllers/voucher.controller";
import { VoucherService } from "../services/voucher.service";

const router = Router();

const service = new VoucherService();
const controller = new VoucherController(service);

router.get("/", controller.getAllVouchers);
router.get("/active/:voucherName", controller.getActiveVoucherByVoucherName);
router.post("/", controller.createVoucher);
router.patch("/:id/toggle", controller.toggleVoucherStatus);
router.patch("/:id/toggleVisibility", controller.toggleVoucherVisible);
router.patch("/:id/validity", controller.toggleValidity);
router.delete("/:id", controller.deleteVoucher);

export default router;
