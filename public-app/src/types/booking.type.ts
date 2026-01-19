import { TYPE } from "./voucher.type";

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
  expiredAt: Date | null;
  mainValuePerUnit: number;
  othersValuePerUnit: number | null;
  voucherName: string | null;
  voucherType: TYPE | null;
  voucherAmount: number | null;
  voucherMaxDiscount: number | null;
  mainValue: number;
  othersValue: number | null;
  adminFee: number | null;
  discount: number | null;
  totalValue: number;
  active: boolean | null;
};

export type BookingWithAccountEntity = BookingEntity & {
  account: {
    accountRank: string;
    accountCode: string;
    priceTierCode: string;
    thumbnailImageUrl: string;
    username?: string;
    password?: string;
  };
  payments?: PaymentEntity[];
};

export type PaymentEntity = {
  id: string;
  bookingId: string;
  status: PAYMENT_STATUS;
  value: number;
  currency: string;
  provider: PROVIDER;
  providerPaymentId: string | null;
  paymentMethod: PAYMENT_METHOD_TYPE | null;
  qrUrl: string | null;
  bankCode: string | null;
  bankAccountNo: string | null;
  bankAccountName: string | null;
  paidAt: Date | null;
  refundedAt: Date | null;
};

export type PaymentWithBookingEntity = PaymentEntity & {
  booking: BookingEntity;
};

export type CreateBookingRequest = {
  customerId?: number;
  accountId: number;
  priceListId: number;
  quantity: number;
  voucherId?: number;
  startAt?: Date;
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
