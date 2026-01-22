import { PAYMENT_METHOD_REQUEST } from "@/types/booking.type";
import { TYPE } from "@/types/voucher.type";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRankImageUrl(rank: string): string {
  if (!rank) return "/rank/unranked.webp";
  const r = rank.toLowerCase();

  if (r.includes("iron")) return "/rank/Iron 3.svg";
  if (r.includes("bronze")) return "/rank/Bronze 3.svg";
  if (r.includes("silver")) return "/rank/Silver 3.svg";
  if (r.includes("gold")) return "/rank/Gold 3.svg";
  if (r.includes("platinum")) return "/rank/Platinum 3.svg";
  if (r.includes("diamond")) return "/rank/Diamond 3.svg";
  if (r.includes("ascendant")) return "/rank/Ascendant 3.svg";
  if (r.includes("immortal")) return "/rank/Immortal 3.svg";
  if (r.includes("radiant")) return "/rank/Radiant.svg";

  return "/rank/unranked.webp";
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
