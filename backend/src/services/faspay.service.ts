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
import { getContextLogger } from "../lib/request-context";
import { hashIdentifier, last4 } from "../lib/log-sanitize";

const faspayLogger = () => getContextLogger({ component: "faspay" });

export class FaspayService {
  constructor(private readonly bookingService: BookingService) {}

  vaInquiry = async (data: VaInquiryRequest): Promise<VaInquiryResponse> => {
    try {
      const {
        partnerServiceId,
        customerNo,
        virtualAccountNo,
        inquiryRequestId
      } = data;

      const trimmedVaNo = virtualAccountNo.trim();
      const now = Date.now();
      const bookingExpiryThreshold = new Date(
        now - env.BOOKING_GRACE_TIME_MILLIS
      );

      const latestPayment = await prisma.payment.findFirst({
        where: { bankAccountNo: trimmedVaNo },
        include: { booking: true },
        orderBy: { createdAt: "desc" }
      });

      if (!latestPayment) {
        return {
          responseCode: "4042412",
          responseMessage: "Payment not found"
        };
      }

      if (!latestPayment.bankAccountName) {
        throw new NotFoundError("Payment bank account name not found");
      }

      if (latestPayment.status === PaymentStatus.SUCCESS) {
        return {
          responseCode: "4042414",
          responseMessage: "Payment has been paid"
        };
      }

      const isExpired =
        latestPayment.status === PaymentStatus.EXPIRED ||
        (latestPayment.booking?.expiredAt &&
          latestPayment.booking.expiredAt < bookingExpiryThreshold);

      if (isExpired) {
        return {
          responseCode: "4042419",
          responseMessage: "Payment expired"
        };
      }

      if (latestPayment.status !== PaymentStatus.PENDING) {
        return {
          responseCode: "4042412",
          responseMessage: "Payment not found"
        };
      }

      const updatedPayment = await prisma.payment.update({
        where: { id: latestPayment.id },
        data: {
          providerPaymentId: inquiryRequestId
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
            currency: latestPayment.currency
          }
        }
      };
    } catch (error) {
      return {
        responseCode: "5002401",
        responseMessage:
          error instanceof Error ? error.message : "Internal server error"
      };
    }
  };

  vaPayment = async (data: VaPaymentRequest): Promise<VaPaymentResponse> => {
    const start = Date.now();
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
        orderBy: { createdAt: "desc" }
      });

      if (!payment || !payment.booking) {
        faspayLogger().warn(
          {
            event: "faspay_va_payment_lookup_missed",
            paymentRequestId,
            referenceNoHash: hashIdentifier(referenceNo),
            virtualAccountNoLast4: last4(virtualAccountNo),
            customerNoHash: hashIdentifier(customerNo),
            durationMs: Date.now() - start
          },
          "Faspay VA payment lookup missed"
        );

        return {
          responseCode: "4042512",
          responseMessage: "Payment not found"
        };
      }

      if (!payment.bankAccountName) {
        throw new NotFoundError("Payment bank account name not found");
      }

      if (payment.booking.totalValue.toFixed(2) !== paidAmount.value) {
        faspayLogger().warn(
          {
            event: "faspay_va_payment_amount_mismatch",
            paymentId: payment.id,
            bookingId: payment.booking.id,
            paymentRequestId,
            referenceNoHash: hashIdentifier(referenceNo),
            expectedAmount: payment.booking.totalValue.toFixed(2),
            receivedAmount: paidAmount.value,
            currency: paidAmount.currency,
            currentPaymentStatus: payment.status,
            currentBookingStatus: payment.booking.status,
            durationMs: Date.now() - start
          },
          "Faspay VA payment amount mismatch"
        );

        return {
          responseCode: "4042513",
          responseMessage: "Invalid amount"
        };
      }

      if (this.bookingService.isPaymentFinal(payment.status)) {
        faspayLogger().warn(
          {
            event: "faspay_va_payment_already_final",
            paymentId: payment.id,
            bookingId: payment.booking.id,
            paymentRequestId,
            referenceNoHash: hashIdentifier(referenceNo),
            currentPaymentStatus: payment.status,
            currentBookingStatus: payment.booking.status,
            durationMs: Date.now() - start
          },
          "Faspay VA payment already final"
        );

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

      faspayLogger().info(
        {
          event: "faspay_va_payment_finalizing",
          paymentId: payment.id,
          bookingId: payment.booking.id,
          paymentRequestId,
          referenceNoHash: hashIdentifier(referenceNo),
          currentPaymentStatus: payment.status,
          currentBookingStatus: payment.booking.status,
          paidAt: trxDateTime
        },
        "Faspay VA payment finalizing"
      );

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

      faspayLogger().info(
        {
          event: "faspay_va_payment_finalized",
          paymentId: payment.id,
          bookingId: payment.booking.id,
          paymentRequestId,
          referenceNoHash: hashIdentifier(referenceNo),
          resultPaymentStatus: updatedPayment.status,
          durationMs: Date.now() - start
        },
        "Faspay VA payment finalized"
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
      faspayLogger().error(
        {
          event: "faspay_va_payment_failed",
          paymentRequestId: data.paymentRequestId,
          referenceNoHash: hashIdentifier(data.referenceNo),
          virtualAccountNoLast4: last4(data.virtualAccountNo),
          customerNoHash: hashIdentifier(data.customerNo),
          errorName: (error as Error).name,
          errorMessage: (error as Error).message,
          durationMs: Date.now() - start
        },
        "Faspay VA payment failed"
      );

      return {
        responseCode: "5002501",
        responseMessage: (error as Error).message
      };
    }
  };
}
