export type VoucherType = "PERSENTASE" | "NOMINAL";

export type Voucher = {
  id: number;
  voucher_name: string;
  is_valid: boolean;
  type: VoucherType;
  percentage?: number | null;
  nominal?: number | null;
  max_discount?: number | null;
  date_start: Date;
  date_end: Date;
};

export type CreateVoucherPayload = Omit<Voucher, "id"> & {
  date_start: Date;
  date_end: Date;
};
