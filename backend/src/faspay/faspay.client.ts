import { Payment, PaymentMethodType, PaymentStatus } from "@prisma/client";
import SnapBi from "../lib/snapbi/snapbi";
import SnapBiConfig from "../lib/snapbi/snapbi.config";
import { BadRequestError, InternalServerError } from "../lib/error";
import { randomBytes } from "crypto";
import { BankCodes } from "../types/booking.type";
import {
  parseToDate,
  parseToLocalDate,
  parseToLocalDateStr
} from "../lib/utils";
import { env } from "../lib/env";

export type CreateQrisPaymentRequest = {
  bookingId: string;
  paymentId: string;
  amount: number;
  expiredAt: Date;
};

export type CreateVaPaymentRequest = {
  bookingId: string;
  paymentId: string;
  customerId: number;
  amount: number;
  bankCode: BankCodes;
  bankAccountName: string;
  expiredAt: Date;
};

export type VerifyWebhookNotificationRequest = {
  billNo: string;
  paymentStatusCode: string;
  signature: string;
  notificationUrlPath: string;
};

export type VerifyWebhookVirtualAccountRequest = {
  payload: any;
  signature: string;
  timestamp: string;
  vaUrlPath: string;
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

export const FASPAY_NOTIFICATION_STATUS_MAP: Record<string, PaymentStatus> = {
  "0": PaymentStatus.PENDING,
  "1": PaymentStatus.PENDING,
  "2": PaymentStatus.SUCCESS,
  "3": PaymentStatus.FAILED,
  "4": PaymentStatus.REFUNDED,
  "5": PaymentStatus.FAILED,
  "7": PaymentStatus.EXPIRED,
  "8": PaymentStatus.CANCELLED,
  "9": PaymentStatus.FAILED
};

export const BANK_CODE_TO_CHANNEL_CODE_MAP: Record<BankCodes, string> = {
  [BankCodes.BNI]: "801",
  [BankCodes.PERMATA]: "402",
  [BankCodes.BRI]: "800"
};

export const BANK_CODE_TO_PREFIX_MAP_STG: Record<BankCodes, string> = {
  [BankCodes.BNI]: "9881236371",
  [BankCodes.PERMATA]: "365901",
  [BankCodes.BRI]: "365905"
};

export const BANK_CODE_TO_PREFIX_MAP_PROD: Record<BankCodes, string> = {
  [BankCodes.BNI]: "1859317",
  [BankCodes.PERMATA]: "735138",
  [BankCodes.BRI]: "365905" // TODO: Update BRI Prod
};

export function getPrefixByBankCode(bankCode: BankCodes): string {
  if (env.NODE_ENV === "production") {
    return BANK_CODE_TO_PREFIX_MAP_PROD[bankCode];
  }

  return BANK_CODE_TO_PREFIX_MAP_STG[bankCode];
}

export function generateLargeNumericId(): string {
  const buf = randomBytes(16);
  return BigInt("0x" + buf.toString("hex"))
    .toString()
    .slice(0, 32);
}

export function toCustomerNo(customerId: number, padStart: number): string {
  return String(customerId).padStart(padStart, "0");
}

export function virtualAccountNoToCustomerNo(
  bankAccountNo: string,
  bankCode: BankCodes
): string {
  return bankAccountNo.slice(getPrefixByBankCode(bankCode).length);
}

export function generateBankAccountNo(
  bankCode: BankCodes,
  customerId: number
): string {
  let prefix = getPrefixByBankCode(bankCode);
  if (prefix.length < 8) {
    prefix = prefix.padStart(8 - prefix.length, " ");
  }
  const customerNo = toCustomerNo(customerId, 16 - prefix.length);
  return prefix + customerNo;
}

export function generatePartnerServiceId(bankCode: BankCodes): string {
  return getPrefixByBankCode(bankCode).padStart(8, " ");
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
    const dateNow = parseToLocalDateStr(new Date());
    const payload = {
      partnerReferenceNo: request.paymentId,
      merchantId: SnapBiConfig.snapBiMerchantId,
      amount: {
        value: request.amount.toFixed(2),
        currency: "IDR"
      },
      validityPeriod: parseToLocalDateStr(request.expiredAt),
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
    const dateNow = parseToLocalDateStr(new Date());
    const virtualAccountNo = generateBankAccountNo(
      request.bankCode,
      request.customerId
    );
    const payload = {
      virtualAccountNo,
      virtualAccountName: request.bankAccountName,
      trxId: virtualAccountNo,
      totalAmount: {
        value: request.amount.toFixed(2),
        currency: "IDR"
      },
      expiredDate: parseToLocalDateStr(request.expiredAt),
      additionalInfo: {
        billDate: dateNow,
        billDescription: `Booking #${request.bookingId}`,
        channelCode: BANK_CODE_TO_CHANNEL_CODE_MAP[request.bankCode]
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
      paymentId: response.virtualAccountData.partnerReferenceNo,
      providerPaymentId: null,
      bankCode: response.virtualAccountData.additionalInfo.channelCode,
      bankAccountNo: response.virtualAccountData.virtualAccountNo.trim(),
      bankAccountName: response.virtualAccountData.virtualAccountName,
      additionalInfo: response.virtualAccountData.additionalInfo,
      metadata: response
    };
  };

  getPaymentStatus = async (payment: Payment) => {
    if (payment.paymentMethod === PaymentMethodType.MANUAL) {
      return {
        responseCode: "2002600",
        responseMessage: "Success",
        paymentId: payment.id,
        providerPaymentId: null,
        paymentStatus: PaymentStatus.PENDING,
        paidAt: null,
        metadata: null
      };
    }

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
      const response = await SnapBi.qris()
        .withTimeStamp(parseToLocalDateStr(new Date()))
        .withBody(payload)
        .getStatus(generateLargeNumericId());

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
        paidAt: parseToDate(response?.paidTime),
        metadata: response
      };
    }

    const bankAccountNo = payment.bankAccountNo!;
    const inquiryRequestId = payment.providerPaymentId;
    const bankCode = payment.bankCode as BankCodes;

    if (bankCode === BankCodes.BNI || !inquiryRequestId) {
      // No inquiry status for BNI/missing provider payment id (if faspay hasn't called the inquiry yet)
      return {
        responseCode: "2002600",
        responseMessage: "Success",
        paymentId: payment.id,
        providerPaymentId: null,
        paymentStatus: PaymentStatus.PENDING,
        paidAt: null,
        metadata: null
      };
    }

    const payload = {
      partnerServiceId: generatePartnerServiceId(bankCode),
      customerNo: virtualAccountNoToCustomerNo(bankAccountNo, bankCode),
      virtualAccountNo: bankAccountNo.padStart(18, " "),
      inquiryRequestId,
      additionalInfo: {
        channelCode: BANK_CODE_TO_CHANNEL_CODE_MAP[bankCode]
      }
    };
    const response = await SnapBi.va()
      .withTimeStamp(parseToLocalDateStr(new Date()))
      .withBody(payload)
      .getStatus(generateLargeNumericId());

    this.validateResponseCode(response);

    const paymentStatus =
      FASPAY_STATUS_MAP[response.virtualAccountData.paymentFlagStatus] ??
      PaymentStatus.FAILED;

    return {
      responseCode: response?.responseCode,
      responseMessage: response?.responseMessage,
      paymentId: payment.id,
      providerPaymentId: response?.virtualAccountData.inquiryRequestId,
      paymentStatus,
      paidAt: parseToLocalDate(response?.virtualAccountData.transactionDate),
      metadata: response
    };
  };

  verifyWebhookNotification = (
    request: VerifyWebhookNotificationRequest
  ): boolean => {
    return SnapBi.notification()
      .withSignature(request.signature)
      .withNotificationUrlPath(request.notificationUrlPath)
      .isWebhookNotificationVerified(request.billNo, request.paymentStatusCode);
  };

  verifyWebhookVirtualAccount = (
    request: VerifyWebhookVirtualAccountRequest
  ): boolean => {
    return SnapBi.notification()
      .withNotificationPayload(request.payload)
      .withSignature(request.signature)
      .withTimeStamp(request.timestamp)
      .withNotificationUrlPath(request.vaUrlPath)
      .isWebhookVirtualAccountVerified();
  };
}
