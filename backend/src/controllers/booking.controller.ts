import { Request, Response, NextFunction } from "express";
import { PaymentChannelType, DurationType } from "@prisma/client";
import { BookingService } from "../services/booking.service";
import { PaymentService } from "../services/payment.service";
import { BadRequestError, ForbiddenError } from "../lib/error";

export class BookingController {
  constructor(
    private readonly bookingService: BookingService,
    private readonly paymentService: PaymentService
  ) {}

  getBooking = async (req: Request, res: Response, next: NextFunction) => {
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

  createBooking = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        userId,
        accountId,
        baseDurationUnit,
        baseDurationType,
        pricePerUnit,
        quantity,
        startAt
      } = req.body;

      if (
        !accountId ||
        !baseDurationUnit ||
        !baseDurationType ||
        !pricePerUnit ||
        !quantity
      ) {
        throw new BadRequestError("Missing required fields.");
      }

      const validatedDurationType: DurationType =
        baseDurationType as DurationType;
      if (!Object.values(DurationType).includes(validatedDurationType)) {
        throw new BadRequestError("Invalid baseDurationType provided.");
      }

      const holdMinutes = 15;

      const booking = await this.bookingService.createBooking({
        userId,
        accountId,
        baseDurationUnit,
        baseDurationType,
        pricePerUnit,
        quantity,
        startAt: startAt ? new Date(startAt) : undefined,
        holdMinutes
      });

      return res.status(201).json({
        id: booking.id,
        status: booking.status,
        startAt: booking.startAt,
        endAt: booking.endAt,
        expiresAt: booking.expiresAt,
        totalValue: booking.totalValue,
        holdMinutes
      });
    } catch (error) {
      return next(error);
    }
  };

  initiatePayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bookingId = req.params.id;
      const { channelType } = req.body;

      const validatedChannel: PaymentChannelType =
        channelType as PaymentChannelType;
      if (!Object.values(PaymentChannelType).includes(validatedChannel)) {
        throw new BadRequestError("Invalid channelType provided.");
      }

      const result = await this.bookingService.payBooking(
        bookingId,
        validatedChannel
      );

      return res.status(200).json({
        message: "Payment session created.",
        paymentId: result.paymentId,
        redirectUrl: result.redirectUrl
      });
    } catch (error) {
      return next(error);
    }
  };

  handlePaymentWebhook = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const signature =
        req.header("x-faspay-signature") || req.header("x-signature");

      if (!signature) {
        throw new ForbiddenError("Invalid webhook signature. Request blocked.");
      }

      await this.paymentService.handlePaymentWebhook(req.body, signature);

      return res.status(200).send("ok");
    } catch (error) {
      if (error instanceof ForbiddenError) {
        return res.status(403).send("Signature Invalid");
      }

      console.error("Webhook processing error:", error);
      return res.status(200).send("ok");
    }
  };
}
