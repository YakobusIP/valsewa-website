import { Booking, PaymentStatus } from "@prisma/client";
import SnapBi from "../lib/snapbi/snapbi";
import SnapBiConfig from "../lib/snapbi/snapbi.config";
import { format, isValid, parse } from "date-fns";

export type GenerateQrisRequest = {
  bookingId: string,
  paymentId: string,
  amount: number,
  qrisValidTo: Date,
}

export type GetPaymentStatusRequest = {
  paymentId: string,
  providerPaymentId: string,
}

export type VerifyWebhookNotificationRequest = {
  payload: any,
  signature: string,
  timestamp: string,
  notificationUrlPath: string,
}

export const FASPAY_STATUS_MAP: Record<string, PaymentStatus> = {
  "00": PaymentStatus.SUCCESS,
  "01": PaymentStatus.PENDING,
  "03": PaymentStatus.PENDING,
  "04": PaymentStatus.REFUNDED,
  "05": PaymentStatus.CANCELLED,
  "06": PaymentStatus.FAILED,
  "07": PaymentStatus.EXPIRED,
};

export const FASPAY_DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";

export function parseFaspayDate(dateStr?: string): Date | null {
  if (!dateStr) return null;

  const parsedDate = parse(dateStr, FASPAY_DATE_FORMAT, new Date());
  return isValid(parsedDate) ? parsedDate : null;
}

export function toFaspayDate(date: Date): string {
  return format(date, FASPAY_DATE_FORMAT);
}

export class FaspayClient {
  constructor() {}

  generateQris = async (request: GenerateQrisRequest) => {
    const payload = {
      paymentReferenceNo: request.paymentId,
      merchantId: SnapBiConfig.snapBiMerchantId,
      amount: {
        value: request.amount.toFixed(2),
        currency: "IDR",
      },
      validityPeriod: request.qrisValidTo,
      additionalInfo: {
        billDate: Date.now(),
        billDescription: `Booking #${request.bookingId}`,
        channelCode: "711",
        phoneNo: "082123456789",
      }
    }

    const response = await SnapBi.qris()
      .withBody(payload)
      .createPayment(request.paymentId);

    return {
      responseCode: response.responseCode,
      responseMessage: response.responseMessage,
      paymentId: response.partnerReferenceNo,
      providerPaymentId: response.referenceNo,
      qrUrl: response.qrUrl,
      additionalInfo: response.additionalInfo,
      metadata: response
    }
  }

  getPaymentStatus = async (request: GetPaymentStatusRequest) => {
    const payload = {
      originalReferenceNo: request.providerPaymentId,
      originalPartnerReferenceNo: request.paymentId,
      merchantId: SnapBiConfig.snapBiMerchantId,
      serviceCode: "47",
      additionalInfo: {
          channelCode: "711",
      }
    }

    const response = await SnapBi.qris()
      .withBody(payload)
      .getStatus(request.paymentId)

    const paymentStatus =
      FASPAY_STATUS_MAP[response.latestTransactionStatus] ??
      PaymentStatus.FAILED;

    return {
      responseCode: response.responseCode,
      responseMessage: response.responseMessage,
      paymentId: response.partnerReferenceNo,
      providerPaymentId: response.referenceNo,
      paymentStatus,
      paidAt: parseFaspayDate(response.paidTime),
      metadata: response,
    }
  }

  verifyWebhookNotification = (request: VerifyWebhookNotificationRequest): boolean => {
    return SnapBi.notification()
      .withNotificationPayload(request.payload)
      .withSignature(request.signature)
      .withTimeStamp(request.timestamp)
      .withNotificationUrlPath(request.notificationUrlPath)
      .isWebhookNotificationVerified()
  }
}
