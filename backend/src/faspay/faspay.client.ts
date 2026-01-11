import { PaymentMethodType, PaymentStatus } from "@prisma/client";
import SnapBi from "../lib/snapbi/snapbi";
import SnapBiConfig from "../lib/snapbi/snapbi.config";
import { BadRequestError, InternalServerError } from "../lib/error";
import { format, isValid, parse } from "date-fns";
import { randomBytes } from "crypto";
import dayjs from "dayjs";
import { PaymentMethod } from "../lib/snapbi/types";
import { BankCodes, PaymentMethodRequest } from "../types/booking.type";

export type CreateQrisPaymentRequest = {
  bookingId: string,
  paymentId: string,
  amount: number,
  expiredAt: Date,
}

export type CreateVaPaymentRequest = {
  bookingId: string,
  paymentId: string,
  amount: number,
  bankCode: string,
  expiredAt: Date,
}

export type GetPaymentStatusRequest = {
  paymentId: string,
  providerPaymentId: string,
  paymentMethod: PaymentMethodType,
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

export function toFaspayLocalDate(date: Date): string {
  return dayjs(date).format('YYYY-MM-DDTHH:mm:ssZ');
}

export function generateLargeNumericId(): string {
  const buf = randomBytes(16);
  return BigInt('0x' + buf.toString('hex')).toString().slice(0, 32);
}

export class FaspayClient {
  constructor() {}

  private validateResponseCode(response: any) {
    if (response?.responseCode.startsWith("4")) {
      throw new BadRequestError(response?.responseMessage);
    } else if (response?.responseCode.startsWith("5")) {
      throw new InternalServerError(response?.responseMessage);
    }
  }

  createQrisPayment = async (request: CreateQrisPaymentRequest) => {
    const dateNow = toFaspayLocalDate(new Date());
    const payload = {
      partnerReferenceNo: request.paymentId,
      merchantId: SnapBiConfig.snapBiMerchantId,
      amount: {
        value: request.amount.toFixed(2),
        currency: "IDR",
      },
      validityPeriod: toFaspayLocalDate(request.expiredAt),
      additionalInfo: {
        billDate: dateNow,
        billDescription: `Booking #${request.bookingId}`,
        channelCode: "711",
        phoneNo: "082123456789",
      }
    }

    const response = await SnapBi.qris()
      .withTimeStamp(dateNow)
      .withBody(payload)
      .createPayment(generateLargeNumericId());

    this.validateResponseCode(response);

    return {
      responseCode: response.responseCode,
      responseMessage: response.responseMessage,
      paymentId: response.partnerReferenceNo,
      providerPaymentId: response.referenceNo,
      qrUrl: response.qrUrl,
      additionalInfo: response.additionalInfo,
      metadata: response,
    }
  }

  createVaPayment = async (request: CreateVaPaymentRequest) => {
    const dateNow = toFaspayLocalDate(new Date());
    const payload = {
      virtualAccountNo: "365901",
      virtualAccountName: "request.bankAccountName",
      trxId: request.paymentId,
      totalAmount: {
        value: request.amount.toFixed(2),
        currency: "IDR",
      },
      expiredDate: toFaspayLocalDate(request.expiredAt),
      additionalInfo: {
        billDate: dateNow,
        billDescription: `Booking #${request.bookingId}`,
        channelCode: request.bankCode,
      },
    }

    const response = await SnapBi.va()
      .withTimeStamp(dateNow)
      .withBody(payload)
      .createPayment(generateLargeNumericId());

    this.validateResponseCode(response);

    return {
      responseCode: response.responseCode,
      responseMessage: response.responseMessage,
      paymentId: response.partnerReferenceNo,
      providerPaymentId: response.referenceNo,
      bankCode: response.additionalInfo.channelCode,
      bankAccountNo: response.virtualAccountNo,
      bankAccountName: response.virtualAccountName,
      additionalInfo: response.additionalInfo,
      metadata: response,
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

    let response = null;
    if (request.paymentMethod === PaymentMethodType.QRIS) {
      response = await SnapBi.qris()
        .withTimeStamp(toFaspayLocalDate(new Date()))
        .withBody(payload)
        .getStatus(generateLargeNumericId())
    } else if (request.paymentMethod === PaymentMethodType.VIRTUAL_ACCOUNT) {
      response = await SnapBi.va()
        .withTimeStamp(toFaspayLocalDate(new Date()))
        .withBody(payload)
        .getStatus(generateLargeNumericId())
    }
    this.validateResponseCode(response);

    const paymentStatus =
      FASPAY_STATUS_MAP[response.latestTransactionStatus] ??
      PaymentStatus.FAILED;

    return {
      responseCode: response?.responseCode,
      responseMessage: response?.responseMessage,
      paymentId: response?.partnerReferenceNo,
      providerPaymentId: response?.referenceNo,
      paymentStatus,
      paidAt: parseFaspayDate(response?.paidTime),
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
