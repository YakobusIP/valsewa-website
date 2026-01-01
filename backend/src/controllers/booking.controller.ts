import { Request, Response, NextFunction, response } from "express";
import { DurationType, Provider, PaymentMethodType } from "@prisma/client";
import { BookingService } from "../services/booking.service";
import { BadRequestError, ForbiddenError } from "../lib/error";
import { FASPAY_STATUS_MAP, FaspayClient, parseFaspayDate, toFaspayDate } from "../faspay/faspay.client";

export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly faspayClient: FaspayClient,
  ) {}

  getBookingById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookingId = req.params.id;
      const booking = await this.bookingService.getBookingById(bookingId);

      return res.status(200).json(booking);
    } catch (error) {
      return next(error);
    }
  };

  getBookingsByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = parseInt(req.params.userId, 10);

      if (!userId) {
        throw new BadRequestError("User ID is required.");
      }

      const bookings = await this.bookingService.getBookingsByUserId(userId);

      return res.status(200).json(bookings);
    } catch (error) {
      return next(error);
    }
  };

  getHoldBookingsByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userId = parseInt(req.params.userId, 10);

      if (!userId) {
        throw new BadRequestError("User ID is required.");
      }

      const bookings = await this.bookingService.getHoldBookingsByUserId(userId);

      return res.status(200).json(bookings);
    } catch (error) {
      return next(error);
    }
  };

  getPaymentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paymentId = req.params.id;
      const payment = await this.bookingService.getPaymentById(paymentId);

      return res.status(200).json(payment);
    } catch (error) {
      return next(error);
    }
  };

  getActivePaymentByBookingId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookingId = req.params.id;
      const payment = await this.bookingService.getActivePaymentByBookingId(bookingId);

      return res.status(200).json(payment);
    } catch (error) {
      return next(error);
    }
  };
  
  createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        userId,
        accountId,
        baseDurationUnit,
        baseDurationType,
        mainValuePerUnit,
        othersValuePerUnit,
        quantity,
        voucherCode,
        startAt
      } = req.body;

      if (
        !accountId ||
        !baseDurationUnit ||
        !baseDurationType ||
        !mainValuePerUnit ||
        !quantity
      ) {
        throw new BadRequestError("Missing required fields.");
      }

      const validatedDurationType: DurationType =
        baseDurationType as DurationType;
      if (!Object.values(DurationType).includes(validatedDurationType)) {
        throw new BadRequestError("Invalid baseDurationType provided.");
      }

      const result = await this.bookingService.createBooking({
        userId,
        accountId,
        baseDurationUnit,
        baseDurationType,
        mainValuePerUnit,
        othersValuePerUnit,
        quantity,
        voucherCode,
        startAt: startAt ? new Date(startAt) : undefined,
      });

      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  };

  payBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookingId = req.params.id;
      if (!bookingId) throw new BadRequestError("Missing required fields.");

      const result = await this.bookingService.payBooking(bookingId, Provider.FASPAY, PaymentMethodType.QRIS);

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };

  verifyPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paymentId } = req.body;
      if (!paymentId) throw new BadRequestError("Missing required fields.");

      const result = await this.bookingService.verifyPayment(paymentId);

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };

  callbackFaspayPayment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const payload = req.body;
      const {
        trx_id,
        merchant_id,
        merchant,
        bill_no,
        payment_date,
        payment_status_code,
      } = payload;
      const signature = req.header("x-signature");
      const timestamp = req.header('x-timestamp');

      if (!trx_id || !payment_status_code || !signature || !timestamp) throw new BadRequestError("Missing required fields.");

      if (!this.faspayClient.verifyWebhookNotification({
        payload,
        timestamp,
        signature,
        notificationUrlPath: "/api/bookings/faspay/callback",
      })) {
        throw new ForbiddenError("Signature Invalid")
      }

      await this.bookingService.callbackFaspayPayment({
        providerPaymentId: trx_id,
        paidAt: payment_date ? parseFaspayDate(payment_date) : null,
        paymentStatus: FASPAY_STATUS_MAP[payment_status_code],
      });

      return res.status(200).json({
        response: "Payment Notification",
        trx_id,
        merchant_id,
        merchant,
        bill_no,
        response_code: "00",
        response_desc: "Success",
        response_date: toFaspayDate(new Date()),
      });
    } catch (error) {
      if (error instanceof ForbiddenError) {
        return res.status(403).send("Signature Invalid");
      }

      console.error("Webhook processing error:", error);
      return res.status(200).json({
        response: "Payment Notification",
        trx_id: "",
        merchant_id: "",
        merchant: "",
        bill_no: "",
        response_code: "00",
        response_desc: "Success",
        response_date: toFaspayDate(new Date()),
      });
    }
  };
}
