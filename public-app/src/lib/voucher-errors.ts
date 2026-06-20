export const VOUCHER_ERROR = {
  NOT_FOUND: "Voucher not found",
  INACTIVE: "This voucher is currently inactive",
  NOT_STARTED: "This voucher is not active yet",
  EXPIRED: "This voucher has expired",
  DELETED: "This voucher is no longer available",
  MIN_ORDER_NOT_MET: "Minimum order value not met for this voucher",
  GLOBAL_QUOTA_EXCEEDED: "This voucher has reached its usage limit",
  USER_QUOTA_EXCEEDED: "You have already used this voucher",
  VOUCHER_LOCKED: "Voucher cannot be changed for this booking"
} as const;

const VOUCHER_ERROR_TITLES: Record<string, string> = {
  [VOUCHER_ERROR.NOT_FOUND]: "Voucher not found",
  [VOUCHER_ERROR.INACTIVE]: "Voucher unavailable",
  [VOUCHER_ERROR.NOT_STARTED]: "Voucher not started",
  [VOUCHER_ERROR.EXPIRED]: "Voucher expired",
  [VOUCHER_ERROR.DELETED]: "Voucher unavailable",
  [VOUCHER_ERROR.MIN_ORDER_NOT_MET]: "Minimum order not met",
  [VOUCHER_ERROR.GLOBAL_QUOTA_EXCEEDED]: "Voucher fully used",
  [VOUCHER_ERROR.USER_QUOTA_EXCEEDED]: "Voucher already used",
  [VOUCHER_ERROR.VOUCHER_LOCKED]: "Voucher locked"
};

export function getVoucherErrorTitle(message: string): string {
  return VOUCHER_ERROR_TITLES[message] ?? "Voucher error";
}

export function formatMinimumOrderMessage(minOrderValue: number): string {
  return `Minimum order of IDR ${minOrderValue.toLocaleString("id-ID")} required for this voucher`;
}
