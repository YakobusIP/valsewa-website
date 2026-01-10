import { BookingStatus, PaymentMethodType, PaymentStatus, Provider, Type } from "@prisma/client";

export type CreateBookingRequest = {
  userId?: number;
  accountId: number;
  priceListId: number;
  quantity: number;
  voucherId?: number;
  startAt?: Date;
};

export type PayBookingRequest = {
  bookingId: string;
  voucherId?: number;
  provider: Provider;
  paymentMethod: PaymentMethodType;
  bankCode?: string;
  bankAccountName?: string;
};

export type BookingResponse = {
  id: string,
  userId: number | null,
  accountId: number,
  status: BookingStatus,
  duration: string,
  quantity: number,
  startAt: Date | null,
  endAt: Date | null,
  expiredAt: Date | null,
  mainValuePerUnit: number,
  othersValuePerUnit: number | null,
  voucherId: number | null,
  voucherType: Type | null,
  voucherAmount: number | null,
  voucherMaxDiscount: number | null,
  mainValue: number,
  othersValue: number | null,
  discount: number | null,
  totalValue: number,
  account?: any,
}

export type PaymentResponse = {
  paymentId: string,
  bookingId: string,
  status: PaymentStatus,
  value: number,
  currency: string,
  provider: Provider,
  providerPaymentId: string | null,
  paymentMethod: PaymentMethodType | null,
  qrUrl: string | null,
  paidAt: Date | null,
  refundedAt: Date | null,
}

export type BookingPriceValues = {
  mainValue: number,
  othersValue: number,
  discount: number,
  totalValue: number,
}

export type CallbackNotificationRequest = {
  providerPaymentId: string,
  paymentStatus: PaymentStatus,
  paidAt: Date | null,
}

export type VoucherResponse = {
  id: number,
  voucherName: string,
  isValid: boolean,
  type: Type,
  percentage: number | null,
  nominal: number | null,
  maxDiscount: number | null,
}
