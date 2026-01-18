import { Router } from "express";
import { BookingService } from "../services/booking.service";
import { BookingController } from "../controllers/booking.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { customerMiddleware } from "../middleware/customer.middleware";
import { schedulerMiddleware } from "../middleware/scheduler.middleware";
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
    this.router.put(
      "/update/:id",
      authMiddleware,
      this.bookingController.updateBooking
    );
    this.router.post(
      "/create",
      authMiddleware,
      this.bookingController.createManualBooking
    );
    this.router.get(
      "/rented",
      authMiddleware,
      this.bookingController.getAccountRented
    );
    this.router.get(
      "/:id",
      customerMiddleware,
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
      customerMiddleware,
      this.bookingController.getPaymentById
    );
    this.router.get(
      "/active-payments/:bookingId",
      authMiddleware,
      this.bookingController.getActivePaymentByBookingId
    );
    this.router.post(
      "/book",
      customerMiddleware,
      this.bookingController.createBooking
    );
    this.router.post("/pay", customerMiddleware, this.bookingController.payBooking);
    this.router.post("/override", authMiddleware, this.bookingController.overrideBooking);
    this.router.post(
      "/cancel",
      customerMiddleware,
      this.bookingController.cancelBooking
    );
    this.router.post(
      "/verify-payment",
      customerMiddleware,
      this.bookingController.verifyPayment
    );
    this.router.post(
      "/force-pay",
      authMiddleware,
      this.bookingController.forcePay
    );
    this.router.post(
      "/sync-expired",
      schedulerMiddleware,
      this.bookingController.syncExpiredBookings
    );
    this.router.post(
      "/sync-completed",
      schedulerMiddleware,
      this.bookingController.syncCompletedBookings
    );
    this.router.post(
      "/sync-account-availability",
      schedulerMiddleware,
      this.bookingController.syncAccountAvailability
    );
    this.router.post(
      "/faspay/callback",
      this.bookingController.callbackFaspayPayment
    );
  }
}

export default new BookingRouter().router;
