import { PAYMENT_METHOD_REQUEST } from "@/types/booking.type";
import { TYPE } from "@/types/voucher.type";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRankImageUrl(rank: string): string {
  if (!rank) return "/rank/unranked.webp";
    const baseRank = rank.trim().split(" ")[0].toLowerCase();
    if (baseRank === "unrated") return "/rank/unranked.webp";
    const normalizedRank = rank;
    return `/rank/${normalizedRank}.svg`;
}

export function convertHoursToDays(hours?: number | string | null) {
  if (!hours || typeof hours !== "number") return undefined;
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  return `${days}d ${remainingHours}h`;
}

export function calculateVoucherDiscount(
  voucher: {
    type: TYPE;
    percentage: number | null;
    nominal: number | null;
    maxDiscount: number | null;
  } | null,
  mainValue: number
): number {
  if (!voucher) return 0;

  let discount = 0;
  if (voucher.type === TYPE.PERSENTASE) {
    const voucherAmount = voucher.percentage ?? 0;
    discount = mainValue * voucherAmount * 0.01;
  } else {
    const voucherAmount = voucher.nominal ?? 0;
    discount = voucherAmount;
  }

  if (voucher.maxDiscount) {
    discount = Math.min(discount, voucher.maxDiscount);
  }

  return Math.min(discount, mainValue);
}

export function calculateAdminFee(
  totalValue: number,
  paymentMethod: PAYMENT_METHOD_REQUEST | null,
): number {
  if (!totalValue || !paymentMethod) return 0;

  if (paymentMethod === PAYMENT_METHOD_REQUEST.QRIS) {
    return Math.ceil(totalValue * 0.00705);
  }
  
  if ([PAYMENT_METHOD_REQUEST.VA_BNI, PAYMENT_METHOD_REQUEST.VA_PERMATA, PAYMENT_METHOD_REQUEST.VA_BRI].includes(paymentMethod)) {
    return 4000;
  }

  return 0;
}

export function calculateTimeRemaining(endAt: Date | null): string {
  if (!endAt) return 'N/A';

  const now = new Date();
  const end = new Date(endAt);
  const diffMs = end.getTime() - now.getTime();

  if (diffMs <= 0) return 'Expired';

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}m`;
}

export function calculateDaysRented(startAt: Date | null, endAt: Date | null): number {
  if (!startAt) return 0;
  if (!endAt) return 0;

  const end = new Date(endAt);
  const start = new Date(startAt);
  const diffMs = end.getTime() - start.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return Math.max(0, days);
}