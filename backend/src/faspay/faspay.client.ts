import { Payment, PaymentMethodType, PaymentStatus } from "@prisma/client";
import SnapBi from "../lib/snapbi/snapbi";
import SnapBiConfig from "../lib/snapbi/snapbi.config";
import { BadRequestError, InternalServerError } from "../lib/error";
import { format, isValid, parse } from "date-fns";
import { randomBytes } from "crypto";
import dayjs from "dayjs";
import { BankCodes } from "../types/booking.type";

export type CreateQrisPaymentRequest = {
  bookingId: string;
  paymentId: string;
  amount: number;
  expiredAt: Date;
};

export type CreateVaPaymentRequest = {
  bookingId: string;
  paymentId: string;
  userId: number;
  amount: number;
  bankCode: BankCodes;
  bankAccountName: string;
  expiredAt: Date;
};

export type VerifyWebhookNotificationRequest = {
  payload: any;
  signature: string;
  timestamp: string;
  notificationUrlPath: string;
};

export const FASPAY_STATUS_MAP: Record<string, PaymentStatus> = {
  "00": PaymentStatus.SUCCESS,
  "01": PaymentStatus.PENDING,
  "03": PaymentStatus.PENDING,
  "04": PaymentStatus.REFUNDED,
  "05": PaymentStatus.CANCELLED,
  "06": PaymentStatus.FAILED,
  "07": PaymentStatus.EXPIRED
};

export const BANK_CODE_TO_CHANNEL_CODE_MAP: Record<BankCodes, string> = {
  [BankCodes.BNI]: "801",
  [BankCodes.PERMATA]: "402",
  [BankCodes.BRI]: "800"
};

export const BANK_CODE_TO_PREFIX_MAP: Record<BankCodes, string> = {
  [BankCodes.BNI]: "9881236371",
  [BankCodes.PERMATA]: "365901",
  [BankCodes.BRI]: "365905"
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

export function parseFaspayLocalDate(dateStr: string): Date {
  return dayjs(dateStr).toDate();
}

export function toFaspayLocalDate(date: Date): string {
  return dayjs(date).format("YYYY-MM-DDTHH:mm:ssZ");
}

export function generateLargeNumericId(): string {
  const buf = randomBytes(16);
  return BigInt("0x" + buf.toString("hex"))
    .toString()
    .slice(0, 32);
}

export function toCustomerNo(userId: number): string {
  return String(userId).padStart(6, "0");
}

export function parseCustomerNo(bankAccountNo: string): number {
  return Number(bankAccountNo.slice(-6));
}

export function generateBankAccountNo(
  bankCode: BankCodes,
  userId: number
): string {
  return BANK_CODE_TO_PREFIX_MAP[bankCode] + toCustomerNo(userId);
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
        currency: "IDR"
      },
      validityPeriod: toFaspayLocalDate(request.expiredAt),
      additionalInfo: {
        billDate: dateNow,
        billDescription: `Booking #${request.bookingId}`,
        channelCode: "711",
        phoneNo: "082123456789"
      }
    };

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
      metadata: response
    };
  };

  createVaPayment = async (request: CreateVaPaymentRequest) => {
    const dateNow = toFaspayLocalDate(new Date());
    const payload = {
      virtualAccountNo: generateBankAccountNo(request.bankCode, request.userId),
      virtualAccountName: request.bankAccountName,
      trxId: request.paymentId,
      totalAmount: {
        value: request.amount.toFixed(2),
        currency: "IDR"
      },
      expiredDate: toFaspayLocalDate(request.expiredAt),
      additionalInfo: {
        billDate: dateNow,
        billDescription: `Booking #${request.bookingId}`,
        channelCode: request.bankCode
      }
    };

    if (request.bankCode !== BankCodes.BNI) {
      return {
        responseCode: null,
        responseMessage: null,
        paymentId: request.paymentId,
        providerPaymentId: null,
        bankCode: request.bankCode,
        bankAccountNo: payload.virtualAccountNo,
        bankAccountName: payload.virtualAccountName,
        additionalInfo: null,
        metadata: null
      };
    }

    // Dynamic VA flow
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
      metadata: response
    };
  };

  getPaymentStatus = async (payment: Payment) => {
    let response = null;
    if (payment.paymentMethod === PaymentMethodType.QRIS) {
      const payload = {
        originalReferenceNo: payment.providerPaymentId,
        originalPartnerReferenceNo: payment.id,
        merchantId: SnapBiConfig.snapBiMerchantId,
        serviceCode: "47",
        additionalInfo: {
          channelCode: "711"
        }
      };
      response = await SnapBi.qris()
        .withTimeStamp(toFaspayLocalDate(new Date()))
        .withBody(payload)
        .getStatus(generateLargeNumericId());
    } else if (payment.paymentMethod === PaymentMethodType.VIRTUAL_ACCOUNT) {
      const payload = {
        partnerServiceId: "",
        customerNo: payment.bankAccountName?.slice(-8),
        virtualAccountNo: payment.bankAccountNo,
        inquiryRequestId: SnapBiConfig.snapBiMerchantId,
        additionalInfo: {
          channelCode: "711",
          trxId: payment.id
        }
      };
      response = await SnapBi.va()
        .withTimeStamp(toFaspayLocalDate(new Date()))
        .withBody(payload)
        .getStatus(generateLargeNumericId());
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
      metadata: response
    };
  };

  verifyWebhookNotification = (
    request: VerifyWebhookNotificationRequest
  ): boolean => {
    return SnapBi.notification()
      .withNotificationPayload(request.payload)
      .withSignature(request.signature)
      .withTimeStamp(request.timestamp)
      .withNotificationUrlPath(request.notificationUrlPath)
      .isWebhookNotificationVerified();
  };
}
