export type DailyDropConfigEntity = {
  id: number;
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

export type UpsertDailyDropConfigPayload = Omit<DailyDropConfigEntity, "id">;

export type DailyDropSlotEntity = {
  slot: number;
  discount: number;
  priceList: {
    id: number;
    duration: string;
    unratedPrice: number;
    compPrice: number;
  };
  account: {
    id: number;
    accountCode: string;
    accountRank: string;
    nickname: string;
    isCompetitive: boolean;
    thumbnail: { imageUrl: string } | null;
    priceTier: { id: number; code: string };
  };
};
