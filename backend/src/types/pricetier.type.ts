type PriceListItem = {
  duration: string;
  normalPrice: number;
  lowPrice: number;
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
