import { BookingStatus, DurationType, PaymentMethodType, PaymentStatus, Provider } from "@prisma/client";

export type CreateBookingRequest = {
  userId: number;
  accountId: number;
  // TODO: Change to price tier ID
  baseDurationUnit: number;
  baseDurationType: DurationType;
  mainValuePerUnit: number;
  othersValuePerUnit?: number;
  quantity: number;
  voucherCode?: string;
  startAt?: Date;
};

export type BookingResponse = {
  id: string,
  userId: number | null,
  accountId: number,
  status: BookingStatus,
  baseDurationUnit: number,
  baseDurationType: DurationType,
  quantity: number,
  startAt: Date | null,
  endAt: Date | null,
  expiredAt: Date | null,
  mainValuePerUnit: number,
  othersValuePerUnit: number | null,
  voucherCode: string | null,
  voucherPercent: number | null,
  mainValue: number,
  othersValue: number | null,
  discount: number | null,
  totalValue: number,
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
