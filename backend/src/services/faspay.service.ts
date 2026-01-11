import { PaymentStatus } from "@prisma/client";
import { parseFaspayLocalDate } from "../faspay/faspay.client";
import { NotFoundError } from "../lib/error";
import { prisma } from "../lib/prisma";
import {
  VaInquiryRequest,
  VaInquiryResponse,
  VaPaymentRequest,
  VaPaymentResponse
} from "../types/faspay.type";
import { BookingService } from "./booking.service";

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

      const payment = await prisma.payment.findFirst({
        where: { bankAccountNo: virtualAccountNo },
        include: {
          booking: true
        }
      });
      if (!payment) {
        throw new NotFoundError("Payment not found");
      }
      return {
        responseCode: "2002400",
        responseMessage: "success",
        virtualAccountData: {
          partnerServiceId,
          customerNo,
          virtualAccountNo: virtualAccountNo,
          virtualAccountName: payment.bankAccountName!,
          virtualAccountEmail: "",
          virtualAccountPhone: "",
          inquiryRequestId
        },
        totalAmount: {
          value: payment.value.toFixed(2),
          currency: payment.currency
        }
      };
    } catch (error) {
      return {
        responseCode: "5002401",
        responseMessage: (error as Error).message
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
        where: { bankAccountNo: virtualAccountNo },
        include: {
          booking: true
        }
      });

      if (!payment || !payment.booking)
        throw new NotFoundError("Record not found!");

      if (this.bookingService.isPaymentFinal(payment.status)) {
        return {
          responseCode: "2002600",
          responseMessage: "success",
          virtualAccountData: {
            partnerServiceId,
            customerNo,
            virtualAccountNo: virtualAccountNo,
            virtualAccountName: payment.bankAccountName!,
            paymentRequestId,
            paidAmount
          }
        };
      }

      const updatedPayment = await prisma.$transaction(async (tx) => {
        return await this.bookingService.finalizeStatus(
          tx,
          payment,
          payment.booking!,
          PaymentStatus.SUCCESS,
          parseFaspayLocalDate(trxDateTime),
          referenceNo
        );
      });

      return {
        responseCode: "2002600",
        responseMessage: "success",
        virtualAccountData: {
          partnerServiceId,
          customerNo,
          virtualAccountNo: virtualAccountNo,
          virtualAccountName: updatedPayment.bankAccountName!,
          paymentRequestId,
          paidAmount
        }
      };
    } catch (error) {
      return {
        responseCode: "5002601",
        responseMessage: (error as Error).message
      };
    }
  };
}
