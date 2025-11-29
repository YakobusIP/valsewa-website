
import {
  Booking,
  BookingStatus,
  DurationType,
  PaymentChannelType
} from "@prisma/client";
import { PaymentService } from "./payment.service";
import {
  InternalServerError,
  NotFoundError,
  PrismaUniqueError
} from "../lib/error";
import { addDays, addHours, addMinutes } from "../lib/utils";
import { prisma } from "../lib/prisma";
import { CreateBookingRequest } from "../types/booking.type";

export class BookingService {
  constructor(private readonly paymentService: PaymentService) {}

  /**
   * Retrieves booking by its id
   */
  getBookingById = async (bookingId: string): Promise<Booking> => {
    try {
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
          successfulPayment: true
        }
      });

      if (!booking) {
        throw new NotFoundError(`Booking with ID ${bookingId} not found.`);
      }
      return booking;
    } catch (error) {
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  /**
   * Retrieves bookings by user id
   */
  getBookingsByUserId = async (userId: number): Promise<Booking[]> => {
    try {
      const bookings = await prisma.booking.findMany({
        where: { userId: userId },
        orderBy: { startAt: "desc" },
        include: {
          successfulPayment: true
        }
      });
      return bookings;
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  /**
   * Creates a new booking in HOLD status after checking availability.
   * @throws {PrismaUniqueError} if the slot is unavailable.
   */
  createBooking = async (data: CreateBookingRequest) => {
    try {
      const {
        userId,
        accountId,
        baseDurationUnit,
        baseDurationType,
        pricePerUnit,
        quantity,
        startAt,
        holdMinutes = 15
      } = data;

      const totalValue = pricePerUnit * quantity;

      let bookingStartAt: Date;
      if (!startAt) {
        bookingStartAt = addMinutes(new Date(), holdMinutes);
      } else {
        bookingStartAt = startAt;
      }

      let bookingEndAt: Date;
      if (baseDurationType === DurationType.HOURLY) {
        bookingEndAt = addHours(bookingStartAt, baseDurationUnit * quantity);
      } else {
        bookingEndAt = addDays(bookingStartAt, baseDurationUnit * quantity);
      }

      const expiresAt = addMinutes(new Date(), holdMinutes);

      return await prisma.$transaction(async (tx) => {
        const overlapping = await tx.booking.findFirst({
          where: {
            accountId,
            AND: [
              { status: { in: [BookingStatus.HOLD, BookingStatus.RESERVED] } },
              { startAt: { lt: bookingEndAt } },
              { endAt: { gt: bookingStartAt } }
            ]
          }
        });

        if (overlapping) {
          throw new PrismaUniqueError(
            "Account not available for the requested time."
          );
        }

        const booking = await tx.booking.create({
          data: {
            userId,
            accountId,
            startAt: bookingStartAt,
            endAt: bookingEndAt,
            expiresAt,
            status: BookingStatus.HOLD,
            totalValue,
            baseDurationUnit,
            baseDurationType,
            pricePerUnit,
            quantity,
            version: 1
          }
        });

        // TODO: Handle expiration job and Redis lock

        return booking;
      });
    } catch (error) {
      if (error instanceof PrismaUniqueError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  /**
   * Initiates payment for a HOLD booking
   */
  payBooking = async (bookingId: string, channel: PaymentChannelType) => {
    try {
      const booking = await prisma.booking.findUnique({
        where: { id: bookingId }
      });
      if (!booking) throw new NotFoundError("Booking not found!");
      if (booking.status !== BookingStatus.HOLD) {
        throw new PrismaUniqueError(
          "Booking is in ${booking.status} status, expected HOLD."
        );
      }

      const result = await this.paymentService.initiatePayment(
        booking,
        channel
      );
      return result;
    } catch (error) {
      if (error instanceof PrismaUniqueError) throw error;
      if (error instanceof NotFoundError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };

  /**
   * Transition booking from HOLD -> RESERVED using optimistic locking.
   * Called internally by PaymentService once a webhook confirms success.
   * @throws {ConflictError} If Optimistic Lock fails (concurrency issue).
   */
  confirmBooking = async (bookingId: string) => {
    try {
      return prisma.$transaction(async (tx) => {
        const booking = await tx.booking.findUnique({
          where: { id: bookingId }
        });

        if (!booking || booking.status !== BookingStatus.HOLD) {
          console.warn(
            `Booking ${bookingId} not in HOLD for confirmation. Skipping.`
          );
          return;
        }

        const updatedBooking = await tx.booking.update({
          where: {
            id: bookingId,
            version: booking.version
          },
          data: {
            status: BookingStatus.RESERVED,
            version: { increment: 1 }
          }
        });

        if (!updatedBooking) {
          throw new PrismaUniqueError(
            "Booking state changed by another process."
          );
        }

        // TODO: Cancel expiration job

        return updatedBooking;
      });
    } catch (error) {
      if (error instanceof PrismaUniqueError) throw error;
      throw new InternalServerError((error as Error).message);
    }
  };
}
