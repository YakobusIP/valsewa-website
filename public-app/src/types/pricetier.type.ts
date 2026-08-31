export type PriceItem = {
  id: string;
  price: string;
};

export type TierPriceItem = {
  id: string;
  price: string;
  priceK: number;
  duration: string;
};

export type PublicPricesResponse = {
  compTiers: TierPriceItem[];
  tiers: TierPriceItem[];
  ranks: PriceItem[];
};
