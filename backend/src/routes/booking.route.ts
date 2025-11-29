import { Router } from "express";
import { BookingService } from "../services/booking.service";
import { BookingController } from "../controllers/booking.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { PaymentService } from "../services/payment.service";

class BookingRouter {
  public router: Router;
  private bookingService: BookingService;
  private paymentService: PaymentService;
  private bookingController: BookingController;

  constructor() {
    this.router = Router();
    this.bookingService = new BookingService(new PaymentService(null as any));
    this.paymentService = new PaymentService(new BookingService(null as any));
    this.bookingController = new BookingController(
      this.bookingService,
      this.paymentService
    );
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/:id", authMiddleware, this.bookingController.getBooking);
    this.router.post(
      "/user/:userId",
      authMiddleware,
      this.bookingController.getBookingsByUserId
    );
    this.router.post("/", authMiddleware, this.bookingController.createBooking);
    this.router.post("/:id/pay", this.bookingController.initiatePayment);
    this.router.post(
      "/webhooks/payment",
      this.bookingController.handlePaymentWebhook
    );
  }
}

export default new BookingRouter().router;
