type PriceTier = {
  id: number;
  code: string;
  bookingFee: number;
  priceList: PriceList[];
};

type PriceTierRequest = Omit<PriceTier, "id"> & {
  bookingFee?: number;
};

type PriceList = {
  id?: number;
  duration: string;
  unratedPrice: number;
  compPrice: number;
};

export type { PriceTier, PriceTierRequest, PriceList };
