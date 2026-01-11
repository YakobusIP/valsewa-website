import { Router } from "express";
import { BookingService } from "../services/booking.service";
import { BookingController } from "../controllers/booking.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { FaspayClient } from "../faspay/faspay.client";

class BookingRouter {
  public router: Router;
  private bookingService: BookingService;
  private faspayClient: FaspayClient;
  private bookingController: BookingController;

  constructor() {
    this.router = Router();
    this.faspayClient = new FaspayClient();
    this.bookingService = new BookingService(this.faspayClient);
    this.bookingController = new BookingController(
      this.bookingService,
      this.faspayClient
    );
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get("/", authMiddleware, this.bookingController.getAllBookings);
    this.router.get(
      "/:id",
      authMiddleware,
      this.bookingController.getBookingById
    );
    this.router.get(
      "/customers/:customerId",
      authMiddleware,
      this.bookingController.getBookingsByCustomerId
    );
    this.router.get(
      "/customers/hold-bookings/:customerId",
      authMiddleware,
      this.bookingController.getHoldBookingsByCustomerId
    );
    this.router.get(
      "/payments/:id",
      authMiddleware,
      this.bookingController.getPaymentById
    );
    this.router.get(
      "/active-payments/:bookingId",
      authMiddleware,
      this.bookingController.getActivePaymentByBookingId
    );
    this.router.post(
      "/book",
      authMiddleware,
      this.bookingController.createBooking
    );
    this.router.post("/pay", authMiddleware, this.bookingController.payBooking);
    this.router.post(
      "/cancel",
      authMiddleware,
      this.bookingController.cancelBooking
    );
    this.router.post(
      "/verify-payment",
      authMiddleware,
      this.bookingController.verifyPayment
    );
    this.router.post(
      "/force-pay",
      authMiddleware,
      this.bookingController.forcePay
    );
    this.router.post(
      "/sync-expired",
      authMiddleware,
      this.bookingController.syncExpiredBookings
    );
    this.router.post(
      "/faspay/callback",
      this.bookingController.callbackFaspayPayment
    );
  }
}

export default new BookingRouter().router;
