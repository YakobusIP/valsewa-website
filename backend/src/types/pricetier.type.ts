type PriceListItem = {
  duration: string;
  unratedPrice: number;
  compPrice: number;
};

type CreatePriceTierRequest = {
  code: string;
  bookingFee?: number;
  priceList: PriceListItem[];
};
type UpdatePriceTierRequest = {
  code?: string;
  bookingFee?: number;
  replacePriceList?: PriceListItem[];
  priceList?: PriceListItem[];
};

export type { PriceListItem, CreatePriceTierRequest, UpdatePriceTierRequest };
