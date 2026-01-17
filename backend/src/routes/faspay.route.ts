import { Router } from "express";
import { FaspayService } from "../services/faspay.service";
import { FaspayController } from "../controllers/faspay.controller";
import { FaspayClient } from "../faspay/faspay.client";
import { BookingService } from "../services/booking.service";

class faspayServiceRouter {
  public router: Router;
  private bookingService: BookingService;
  private faspayClient: FaspayClient;
  private faspayService: FaspayService;
  private faspayController: FaspayController;

  constructor() {
    this.router = Router();
    this.faspayClient = new FaspayClient();
    this.bookingService = new BookingService(this.faspayClient);
    this.faspayService = new FaspayService(this.bookingService);
    this.faspayController = new FaspayController(this.faspayService);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/v1.0/transfer-va/inquiry",
      this.faspayController.vaInquiry
    );
    this.router.post(
      "/v1.0/transfer-va/payment",
      this.faspayController.vaPayment
    );
  }
}

export default new faspayServiceRouter().router;
