export type PriceItem = {
  id: string;
  price: string;
};

export type PublicPricesResponse = {
  compTiers: PriceItem[];
  tiers: PriceItem[];
  ranks: PriceItem[];
};
