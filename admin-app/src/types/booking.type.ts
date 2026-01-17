import { AccountEntity } from "./account.type";
import { VoucherType } from "./voucher.type";

export enum BOOKING_STATUS {
  HOLD = "HOLD",
  RESERVED = "RESERVED",
  EXPIRED = "EXPIRED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED"
}

export enum PAYMENT_STATUS {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  EXPIRED = "EXPIRED",
  FAILED = "FAILED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED"
}

export enum PROVIDER {
  FASPAY = "FASPAY",
  MANUAL = "MANUAL"
}

export enum PAYMENT_METHOD_REQUEST {
  QRIS = "QRIS",
  VA_BNI = "VA_BNI",
  VA_PERMATA = "VA_PERMATA",
  VA_BRI = "VA_BRI",
  MANUAL = "MANUAL"
}

export enum PAYMENT_METHOD_TYPE {
  QRIS = "QRIS",
  VIRTUAL_ACCOUNT = "VIRTUAL_ACCOUNT",
  MANUAL = "MANUAL"
}

export type BookingEntity = {
  id: string;
  customerId: number | null;
  accountId: number;
  status: BOOKING_STATUS;
  duration: string;
  quantity: number;
  startAt: Date | null;
  endAt: Date | null;
  createdAt: Date | null;
  expiredAt: Date | null;
  mainValuePerUnit: number;
  othersValuePerUnit: number | null;
  voucherName: string | null;
  voucherType: VoucherType | null;
  voucherAmount: number | null;
  voucherMaxDiscount: number | null;
  mainValue: number;
  othersValue: number | null;
  discount: number | null;
  totalValue: number;
  payments: PaymentEntity[];
};

export type BookingWithAccountEntity = BookingEntity & {
  account: AccountEntity;
};

export type PaymentEntity = {
  paymentId: string;
  bookingId: string;
  status: PAYMENT_STATUS;
  value: number;
  currency: string;
  provider: PROVIDER;
  providerPaymentId: string | null;
  paymentMethod: PAYMENT_METHOD_TYPE | null;
  qrUrl: string | null;
  paidAt: Date | null;
  refundedAt: Date | null;
};

export type PaymentWithBookingEntity = PaymentEntity & {
  booking: BookingEntity;
};

export type CreateBookingRequest = {
  accountCode: string;
  totalValue: number;
  startAt?: Date;
};

export type UpdateBookingRequest = {
  totalValue: number;
};

export type CancelBookingRequest = {
  bookingId: string;
};

export type PayBookingRequest = {
  bookingId: string;
  voucherId?: number;
  provider: PROVIDER;
  paymentMethod: PAYMENT_METHOD_REQUEST;
};

export type VerifyPaymentRequest = {
  paymentId: string;
};
