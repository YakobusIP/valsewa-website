export type PriceItem = {
  id: string;
  price: string;
};

export type PublicPricesResponse = {
  lrTiers: PriceItem[];
  tiers: PriceItem[];
  ranks: PriceItem[];
};
