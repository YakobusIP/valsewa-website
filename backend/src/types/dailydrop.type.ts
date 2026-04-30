export type UpsertDailyDropConfigRequest = {
  discountMin: number;
  discountMax: number;
  slot1Discount: number | null;
  slot2Discount: number | null;
  slot3Discount: number | null;
  slot1PriceTierIds: number[];
  slot2PriceTierIds: number[];
  slot3PriceTierIds: number[];
  slot1PriceListIds: number[];
  slot2PriceListIds: number[];
  slot3PriceListIds: number[];
  allowedAccountIds: number[];
};
