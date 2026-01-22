import { Request, Response, NextFunction } from "express";
import { Provider } from "@prisma/client";
import { BookingService } from "../services/booking.service";
import {
  BadRequestError,
  ForbiddenError,
} from "../lib/error";
import { FASPAY_NOTIFICATION_STATUS_MAP, FaspayClient } from "../faspay/faspay.client";
import { PaymentMethodRequest } from "../types/booking.type";
import { parseToDate, parseToDateStr } from "../lib/utils";

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

  getAccountRented = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const startDate = req.query.start_date
        ? new Date(req.query.start_date as string)
        : undefined;
      const endDate = req.query.end_date
        ? new Date(req.query.end_date as string)
        : undefined;

      const data = await this.bookingService.getAccountRented(
        startDate,
        endDate
      );
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

      const result = await this.bookingService.updateBooking(
        bookingId,
        totalValue
      );

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
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;

      if (!customerId) {
        throw new BadRequestError("Customer ID is required.");
      }

      if (page < 1) {
        throw new BadRequestError("Page must be greater than 0.");
      }
    
      if (limit < 1 || limit > 100) {
        throw new BadRequestError("Limit must be between 1 and 100.");
      }
    
      const result = await this.bookingService.getBookingsByCustomerId(
        customerId,
        page,
        limit
      );
    
      return res.status(200).json(result);
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

  createManualBooking = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { accountCode, totalValue } = req.body;

      if (!accountCode || !totalValue) {
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

  createAdminBooking = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { accountId, startAt, duration, totalValue } = req.body;

      if (!accountId || !startAt || !duration || totalValue === undefined) {
        throw new BadRequestError("Missing required fields.");
      }

      const result = await this.bookingService.createAdminBooking({
        accountId,
        startAt: new Date(startAt),
        duration,
        totalValue
      });

      return res.status(201).json(result);
    } catch (error) {
      return next(error);
    }
  };

  overrideBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookingId, accountId } = req.body;

      if (!bookingId || !accountId) {
        throw new BadRequestError("Missing required fields.");
      }
      const result = await this.bookingService.overrideBooking({
        bookingId,
        accountId
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

  syncCompletedBookings = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.bookingService.syncCompletedBookings();

      return res.status(200).json(result);
    } catch (error) {
      return next(error);
    }
  };

  syncAccountAvailability = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.bookingService.syncAccountAvailability();

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
      console.log("[callbackFaspayPayment] Processing faspay callback payment with request:",  JSON.stringify({ 
        method: req.method,
        path: req.originalUrl,
        headers: req.headers, 
        body: req.body,
        query: req.query,
        params: req.params,
      }));
      const payload = req.body;
      const {
        trx_id,
        merchant_id,
        merchant,
        bill_no,
        payment_date,
        payment_status_code,
        signature
      } = payload;

      if (!trx_id || !payment_status_code || !signature)
        throw new BadRequestError("Missing required fields.");

      if (
        !this.faspayClient.verifyWebhookNotification({
          billNo: bill_no,
          paymentStatusCode: payment_status_code,
          signature,
          notificationUrlPath: "/api/bookings/faspay/callback"
        })
      ) {
        throw new ForbiddenError("Signature Invalid");
      }

      await this.bookingService.callbackFaspayPayment({
        billNo: bill_no,
        paidAt: payment_date ? parseToDate(payment_date) : null,
        paymentStatus: FASPAY_NOTIFICATION_STATUS_MAP[payment_status_code]
      });

      const result = {
        response: "Payment Notification",
        trx_id,
        merchant_id,
        merchant,
        bill_no,
        response_code: "00",
        response_desc: "Success",
        response_date: parseToDateStr(new Date())
      }

      console.log("[vaInquiry] Processed faspay callback payment with result:", JSON.stringify(result));

      return res.status(200).json(result);
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
        response_date: parseToDateStr(new Date())
      });
    }
  };
}
