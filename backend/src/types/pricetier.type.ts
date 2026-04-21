type PriceListItem = {
  duration: string;
  unratedPrice: number;
  compPrice: number;
};

type CreatePriceTierRequest = {
  code: string;
  priceList: PriceListItem[];
};
type UpdatePriceTierRequest = {
  code?: string;
  replacePriceList?: PriceListItem[];
  priceList?: PriceListItem[];
};

export type { PriceListItem, CreatePriceTierRequest, UpdatePriceTierRequest };
