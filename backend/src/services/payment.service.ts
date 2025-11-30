import { Booking, PaymentStatus, PaymentChannelType } from "@prisma/client";
import { BookingService } from "./booking.service";
import {
  FasPayAdapter,
  PaymentGatewayAdapter,
  PaymentWebhookResult
} from "./payment.adapter";
import {
  ForbiddenError,
  InternalServerError,
  NotFoundError
} from "../lib/error";
import { prisma } from "../lib/prisma";

const getGatewayAdapter = (gatewayName: string): PaymentGatewayAdapter => {
  if (gatewayName === "FasPay") {
    return new FasPayAdapter();
  }

  throw new InternalServerError(
    `Unsupported gateway configuration: ${gatewayName}`
  );
};

export class PaymentService {
  private readonly gatewayName = "FasPay";

  constructor(private readonly bookingService: BookingService) {}

  /**
   * Creates a PENDING payment record and contacts the gateway for a session.
   */
  initiatePayment = async (
    booking: Booking,
    channelType: PaymentChannelType
  ) => {
    try {
      const adapter = getGatewayAdapter(this.gatewayName);

      const payment = await prisma.payment.create({
        data: {
          bookingId: booking.id,
          value: booking.totalValue, // Use the definitive price from Booking
          status: PaymentStatus.PENDING,
          gateway: this.gatewayName,
          channelType: channelType,
          providerId: "TEMP-" + booking.id // TEMP provider ID
        }
      });

      const session = await adapter.createSession(
        booking,
        payment.id,
        channelType
      );

      await prisma.payment.update({
        where: { id: payment.id },
        data: {
          providerId: session.providerTransactionId,
          channelCode: session.channelCode
        }
      });

      return { paymentId: payment.id, redirectUrl: session.paymentRedirectUrl };
    } catch (error) {
      throw new InternalServerError((error as Error).message);
    }
  };

  /**
   * Handles the payment notification webhook from the gateway
   */
  handlePaymentWebhook = async (payload: any, signature: string) => {
    const adapter = getGatewayAdapter(this.gatewayName);

    if (!adapter.verifyWebhook(payload, signature)) {
      throw new ForbiddenError("Invalid webhook signature. Request blocked.");
    }

    const result: PaymentWebhookResult = adapter.processWebhook(payload);

    return await prisma.$transaction(async (tx) => {
      const existingPayment = await tx.payment.findUnique({
        where: { providerId: result.providerId }
      });

      if (!existingPayment) {
        throw new NotFoundError(
          `Payment not found for provider ID: ${result.providerId}`
        );
      }

      // Already processed. Exit gracefully.
      if (existingPayment.status === PaymentStatus.SUCCESS) {
        return;
      }

      await tx.payment.update({
        where: { id: existingPayment.id },
        data: {
          status: result.status,
          failureReason: result.failureReason,
          metadata: payload
        }
      });

      if (result.status === PaymentStatus.SUCCESS) {
        await this.bookingService.confirmBooking(existingPayment.bookingId);
        await tx.booking.update({
          where: { id: existingPayment.bookingId },
          data: { successfulPaymentId: existingPayment.id }
        });
      }
    });
  };
}
