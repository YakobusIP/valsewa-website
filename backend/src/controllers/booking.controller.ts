import { Request, Response, NextFunction, response } from "express";
import { Provider, PaymentMethodType } from "@prisma/client";
import { BookingService } from "../services/booking.service";
import { BadRequestError, ForbiddenError, UnprocessableEntityError } from "../lib/error";
import {
  FASPAY_STATUS_MAP,
  FaspayClient,
  parseFaspayDate,
  toFaspayDate
} from "../faspay/faspay.client";
import { PaymentMethodRequest } from "../types/booking.type";

export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly faspayClient: FaspayClient
  ) {}

  getAllBookings = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = req.query.page ?? undefined;
      const limit = req.query.limit ?? undefined;
      const query = req.query.q as string;

      const [data, metadata] = await this.bookingService.getAllBookings(
        page ? parseInt(page as string) : undefined,
        limit ? parseInt(limit as string) : undefined,
        query
      );

      return res.json({ data, metadata });
    } catch (error) {
      return next(error);
    }
  };

  getBookingById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookingId = req.params.id;
      const booking = await this.bookingService.getBookingById(bookingId);

      return res.status(200).json(booking);
    } catch (error) {
      return next(error);
    }
  };
  
  getAccountRented = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const startDate = req.query.start_date ? new Date(req.query.start_date as string) : undefined;
      const endDate = req.query.end_date ? new Date(req.query.end_date as string) : undefined;

      const data = await this.bookingService.getAccountRented(startDate, endDate);
      return res.json({ data });
    } catch (error) {
      return next(error);
    }
  };
  
  updateBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookingId = req.params.id;
      const totalValue = req.body.totalValue;
      if (!bookingId) throw new BadRequestError("Booking ID is required.");

      const result = await this.bookingService.updateBooking(bookingId, totalValue);

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };
  getBookingsByCustomerId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const customerId = parseInt(req.params.customerId, 10);

      if (!customerId) {
        throw new BadRequestError("Customer ID is required.");
      }

      const bookings =
        await this.bookingService.getBookingsByCustomerId(customerId);

      return res.status(200).json(bookings);
    } catch (error) {
      return next(error);
    }
  };

  getHoldBookingsByCustomerId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const customerId = parseInt(req.params.customerId, 10);

      if (!customerId) {
        throw new BadRequestError("Customer ID is required.");
      }

      const bookings =
        await this.bookingService.getHoldBookingsByCustomerId(customerId);

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

  getActivePaymentByBookingId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const bookingId = req.params.id;
      const payment =
        await this.bookingService.getActivePaymentByBookingId(bookingId);

      return res.status(200).json(payment);
    } catch (error) {
      return next(error);
    }
  };

  createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        customerId,
        accountId,
        priceListId,
        quantity,
        voucherId,
        startAt
      } = req.body;

      if (!accountId || !priceListId || !quantity) {
        throw new BadRequestError("Missing required fields.");
      }

      const result = await this.bookingService.createBooking({
        customerId,
        accountId,
        priceListId,
        quantity,
        voucherId,
        startAt: startAt ? new Date(startAt) : undefined
      });

      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  };

  createManualBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        accountCode,
        totalValue
      } = req.body;

      if (!accountCode || !totalValue ) {
        throw new BadRequestError("Missing required fields.");
      }
      const result = await this.bookingService.createManualBooking({
        accountCode,
        totalValue
      });

      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  };

  cancelBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookingId } = req.body;
      if (!bookingId) throw new BadRequestError("Missing required fields.");

      const result = await this.bookingService.cancelBooking(bookingId);

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };

  payBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookingId, voucherId, provider, paymentMethod } = req.body;
      if (!bookingId) throw new BadRequestError("Missing required fields.");

      const result = await this.bookingService.payBooking({
        bookingId,
        voucherId,
        provider: provider ?? Provider.FASPAY,
        paymentMethod: paymentMethod ?? PaymentMethodRequest.QRIS
      });

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

  forcePay = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { paymentId } = req.body;
      if (!paymentId) throw new BadRequestError("Missing required fields.");

      const result = await this.bookingService.forcePay(paymentId);

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };

  syncExpiredBookings = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.bookingService.syncExpiredBookings();

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
        payment_status_code
      } = payload;
      const signature = req.header("x-signature");
      const timestamp = req.header("x-timestamp");

      if (!trx_id || !payment_status_code || !signature || !timestamp)
        throw new BadRequestError("Missing required fields.");

      if (
        !this.faspayClient.verifyWebhookNotification({
          payload,
          timestamp,
          signature,
          notificationUrlPath: "/api/bookings/faspay/callback"
        })
      ) {
        throw new ForbiddenError("Signature Invalid");
      }

      await this.bookingService.callbackFaspayPayment({
        providerPaymentId: trx_id,
        paidAt: payment_date ? parseFaspayDate(payment_date) : null,
        paymentStatus: FASPAY_STATUS_MAP[payment_status_code]
      });

      return res.status(200).json({
        response: "Payment Notification",
        trx_id,
        merchant_id,
        merchant,
        bill_no,
        response_code: "00",
        response_desc: "Success",
        response_date: toFaspayDate(new Date())
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
        response_date: toFaspayDate(new Date())
      });
    }
  };
}
