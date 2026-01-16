import {
  BookingStatus,
  Payment,
  PaymentMethodType,
  PaymentStatus,
  Provider,
  Type
} from "@prisma/client";

export enum PaymentMethodRequest {
  QRIS = "QRIS",
  VA_BNI = "VA_BNI",
  VA_PERMATA = "VA_PERMATA",
  VA_BRI = "VA_BRI",
  MANUAL = "MANUAL"
}

export enum BankCodes {
  BNI = "BNI",
  PERMATA = "PERMATA",
  BRI = "BRI"
}

export type CreateBookingRequest = {
  customerId?: number;
  accountId: number;
  priceListId: number;
  quantity: number;
  voucherId?: number;
  startAt?: Date;
};

export type CreateManualBookingRequest = {
  accountCode: string;
  totalValue: number;
  startAt?: Date;
};

export type OverrideBookingRequest = {
  bookingId: string;
  accountId: number;
};

export type PayBookingRequest = {
  bookingId: string;
  voucherId?: number;
  provider: Provider;
  paymentMethod: PaymentMethodRequest;
};

export type BookingResponse = {
  id: string;
  customerId: number | null;
  accountId: number;
  status: BookingStatus;
  duration: string;
  quantity: number;
  startAt: Date | null;
  endAt: Date | null;
  createdAt: Date | null;
  expiredAt: Date | null;
  mainValuePerUnit: number;
  othersValuePerUnit: number | null;
  voucherName: string | null;
  voucherType: Type | null;
  voucherAmount: number | null;
  voucherMaxDiscount: number | null;
  mainValue: number;
  othersValue: number | null;
  discount: number | null;
  totalValue: number;
  account?: any;
  payments?: Payment[];
};

export type UpdateBookingRequest = {
  totalValue: number;
};

export type PaymentResponse = {
  paymentId: string;
  bookingId: string;
  status: PaymentStatus;
  value: number;
  currency: string;
  provider: Provider;
  providerPaymentId: string | null;
  paymentMethod: PaymentMethodType | null;
  qrUrl: string | null;
  bankCode?: BankCodes | null;
  bankAccountNo?: string | null;
  bankAccountName?: string | null;
  paidAt: Date | null;
  refundedAt: Date | null;
  booking?: any;
};

export type BookingPriceValues = {
  mainValue: number;
  othersValue: number;
  discount: number;
  totalValue: number;
};

export type CallbackNotificationRequest = {
  providerPaymentId: string;
  paymentStatus: PaymentStatus;
  paidAt: Date | null;
};

export type VoucherResponse = {
  id: number;
  voucherName: string;
  isValid: boolean;
  type: Type;
  percentage: number | null;
  nominal: number | null;
  maxDiscount: number | null;
};
