export type VoucherType = "PERSENTASE" | "NOMINAL";

export type Voucher = {
  id: number;
  voucherCode: string;
  voucherName: string;
  isValid: boolean;
  isVisible: boolean;
  type: VoucherType;
  percentage?: number | null;
  nominal?: number | null;
  maxDiscount?: number | null;
  minOrderValue?: number | null;
  maxGlobalUsage?: number | null;
  maxUsagePerUser?: number | null;
  usageCount?: number;
  dateStart: Date;
  dateEnd: Date;
};

export type CreateVoucherPayload = Omit<Voucher, "id" | "usageCount"> & {
  dateStart: Date;
  dateEnd: Date;
};

export type UpdateVoucherPayload = {
  minOrderValue?: number | null;
  maxGlobalUsage?: number | null;
  maxUsagePerUser?: number | null;
  dateEnd?: Date;
};

export type VoucherUsageSummary = {
  totalUsage: number;
  totalGmv: number;
  totalDiscountGiven: number;
  maxGlobalUsage: number | null;
};

export type VoucherUsageBookingRow = {
  id: string;
  readableNumber: string;
  status: string;
  customerUsername: string | null;
  orderValue: number;
  discount: number;
  totalPaid: number;
  createdAt: string;
};
