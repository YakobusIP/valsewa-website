export enum TYPE {
  PERSENTASE = "PERSENTASE",
  NOMINAL = "NOMINAL",
}

export type VoucherEntity = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  type: TYPE;
  voucherName: string;
  isValid: boolean;
  isVisible: boolean;
  percentage: number | null;
  nominal: number | null;
  maxDiscount: number | null;
  dateStart: Date;
  dateEnd: Date;
};
