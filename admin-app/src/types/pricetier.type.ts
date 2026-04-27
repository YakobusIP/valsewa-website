type PriceTier = {
  id: number;
  code: string;
  priceList: PriceList[];
};

type PriceTierRequest = Omit<PriceTier, "id">;

type PriceList = {
  duration: string;
  unratedPrice: number;
  compPrice: number;
};

export type { PriceTier, PriceTierRequest, PriceList };
