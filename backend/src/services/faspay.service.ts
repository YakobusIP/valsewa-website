import { PaymentStatus, Prisma } from "@prisma/client";
import { ForbiddenError, NotFoundError } from "../lib/error";
import { prisma } from "../lib/prisma";
import {
  VaInquiryRequest,
  VaInquiryResponse,
  VaPaymentRequest,
  VaPaymentResponse
} from "../types/faspay.type";
import { BookingService } from "./booking.service";
import { parseToLocalDate } from "../lib/utils";
import { env } from "../lib/env";

export class FaspayService {
  constructor(private readonly bookingService: BookingService) {}

  vaInquiry = async (
    data: VaInquiryRequest
  ): Promise<VaInquiryResponse> => {
    try {
      const {
        partnerServiceId,
        customerNo,
        virtualAccountNo,
        inquiryRequestId,
      } = data;

      const trimmedVaNo = virtualAccountNo.trim();
      const now = Date.now();
      const bookingExpiryThreshold = new Date(
        now - env.BOOKING_GRACE_TIME_MILLIS
      );

      const latestPayment = await prisma.payment.findFirst({
        where: { bankAccountNo: trimmedVaNo },
        include: { booking: true },
        orderBy: { createdAt: "desc" },
      });

      if (!latestPayment) {
        return {
          responseCode: "4042412",
          responseMessage: "Payment not found",
        };
      }

      if (!latestPayment.bankAccountName) {
        throw new NotFoundError("Payment bank account name not found");
      }

      if (latestPayment.status === PaymentStatus.SUCCESS) {
        return {
          responseCode: "4042414",
          responseMessage: "Payment has been paid",
        };
      }

      const isExpired =
        latestPayment.status === PaymentStatus.EXPIRED ||
        (latestPayment.booking?.expiredAt &&
          latestPayment.booking.expiredAt < bookingExpiryThreshold);

      if (isExpired) {
        return {
          responseCode: "4042419",
          responseMessage: "Payment expired",
        };
      }

      if (latestPayment.status !== PaymentStatus.PENDING) {
        return {
          responseCode: "4042412",
          responseMessage: "Payment not found",
        };
      }

      const updatedPayment = await prisma.payment.update({
        where: { id: latestPayment.id },
        data: {
          providerPaymentId: inquiryRequestId,
        }
      });

      return {
        responseCode: "2002400",
        responseMessage: "Success",
        virtualAccountData: {
          partnerServiceId,
          customerNo,
          virtualAccountNo: trimmedVaNo,
          virtualAccountName: latestPayment.bankAccountName,
          virtualAccountEmail: "",
          virtualAccountPhone: "",
          inquiryRequestId: updatedPayment.providerPaymentId!,
          totalAmount: {
            value: latestPayment.value.toFixed(2),
            currency: latestPayment.currency,
          },
        },
      };
    } catch (error) {
      return {
        responseCode: "5002401",
        responseMessage:
          error instanceof Error ? error.message : "Internal server error",
      };
    }
  };

  vaPayment = async (data: VaPaymentRequest): Promise<VaPaymentResponse> => {
    try {
      const {
        partnerServiceId,
        customerNo,
        virtualAccountNo,
        paymentRequestId,
        paidAmount,
        trxDateTime,
        referenceNo
      } = data;

      const payment = await prisma.payment.findFirst({
        where: { bankAccountNo: virtualAccountNo.trim() },
        include: { booking: true },
        orderBy: { createdAt: "desc" },
      });

      if (!payment || !payment.booking) {
        return {
          responseCode: "4042512",
          responseMessage: "Payment not found",
        };
      }

      if (!payment.bankAccountName) {
        throw new NotFoundError("Payment bank account name not found");
      }

      if (payment.booking.totalValue.toFixed(2) !== paidAmount.value) {
        return {
          responseCode: "4042513",
          responseMessage: "Invalid amount",
        };
      }

      if (this.bookingService.isPaymentFinal(payment.status)) {
        return {
          responseCode: "2002500",
          responseMessage: "Success",
          virtualAccountData: {
            partnerServiceId,
            customerNo,
            virtualAccountNo,
            virtualAccountName: payment.bankAccountName,
            paymentRequestId,
            paidAmount
          }
        };
      }

      const updatedPayment = await prisma.$transaction(
        async (tx: Prisma.TransactionClient) => {
          return await this.bookingService.finalizeStatus(
            tx,
            payment,
            payment.booking!,
            PaymentStatus.SUCCESS,
            parseToLocalDate(trxDateTime),
            referenceNo
          );
        }
      );

      return {
        responseCode: "2002500",
        responseMessage: "Success",
        virtualAccountData: {
          partnerServiceId,
          customerNo,
          virtualAccountNo,
          virtualAccountName: updatedPayment.bankAccountName!,
          paymentRequestId,
          paidAmount
        }
      };
    } catch (error) {
      return {
        responseCode: "5002501",
        responseMessage: (error as Error).message
      };
    }
  };
}
