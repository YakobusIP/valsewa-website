type PriceListItem = {
  duration: string;
  unratedPrice: number;
  compPrice: number;
};

type UpdatePriceListItem = PriceListItem & { id?: number };

type CreatePriceTierRequest = {
  code: string;
  bookingFee?: number;
  priceList: PriceListItem[];
};
type UpdatePriceTierRequest = {
  code?: string;
  bookingFee?: number;
  replacePriceList?: UpdatePriceListItem[];
  priceList?: UpdatePriceListItem[];
};

export type {
  PriceListItem,
  UpdatePriceListItem,
  CreatePriceTierRequest,
  UpdatePriceTierRequest
};
