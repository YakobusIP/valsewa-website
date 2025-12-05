export type VoucherType = "PERSENTASE" | "NOMINAL";

export type Voucher = {
  id: number;
  voucherName: string;
  isValid: boolean;
  type: VoucherType;
  percentage?: number | null;
  nominal?: number | null;
  maxDiscount?: number | null;
  dateStart: Date;
  dateEnd: Date;
};

export type CreateVoucherPayload = Omit<Voucher, "id"> & {
  dateStart: Date;
  dateEnd: Date;
};
