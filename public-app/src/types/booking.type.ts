import { AccountEntity } from "./account.type";
import { TYPE } from "./voucher.type";

export enum BOOKING_STATUS {
  HOLD = "HOLD",
  RESERVED = "RESERVED",
  EXPIRED = "EXPIRED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

export enum PAYMENT_STATUS {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  EXPIRED = "EXPIRED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

export enum PROVIDER {
  FASPAY = "FASPAY",
  MANUAL = "MANUAL",
}

export enum PAYMENT_METHOD_TYPE {
  QRIS = "QRIS",
  VIRTUAL_ACCOUNT = "VIRTUAL_ACCOUNT",
  MANUAL = "MANUAL",
}

export type BookingEntity = {
  id: string,
  userId: number | null,
  accountId: number,
  status: BOOKING_STATUS,
  duration: string,
  quantity: number,
  startAt: Date | null,
  endAt: Date | null,
  expiredAt: Date | null,
  mainValuePerUnit: number,
  othersValuePerUnit: number | null,
  voucherId: number | null,
  voucherType: TYPE | null,
  voucherAmount: number | null,
  voucherMaxDiscount: number | null,
  mainValue: number,
  othersValue: number | null,
  discount: number | null,
  totalValue: number,
};

export type BookingWithAccountEntity = BookingEntity & {
  account: AccountEntity,
};

export type PaymentEntity = {
  paymentId: string,
  bookingId: string,
  status: PAYMENT_STATUS,
  value: number,
  currency: string,
  provider: PROVIDER,
  providerPaymentId: string | null,
  paymentMethod: PAYMENT_METHOD_TYPE | null,
  qrUrl: string | null,
  paidAt: Date | null,
  refundedAt: Date | null,
}

export type CreateBookingRequest = {
  userId?: number;
  accountId: number;
  priceListId: number;
  quantity: number;
  voucherId?: number;
  startAt?: Date;
}

export type PayBookingRequest = {
  bookingId: string;
  voucherId?: number;
  provider: PROVIDER;
  paymentMethod: PAYMENT_METHOD_TYPE;
  bankCode?: string;
  bankAccountName?: string;
}

export type VerifyPaymentRequest = {
  paymentId: string;
}