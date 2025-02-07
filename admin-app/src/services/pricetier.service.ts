import { ApiResponseList } from "@/types/api.type";
import { PriceTier } from "@/types/pricetier.type";

import { handleAxiosError, interceptedAxios } from "@/lib/axios";

import { stringify } from "qs";

const BASE_PRICETIER_URL = "/api/price-tiers";

const createPriceTierService = () => {
  const fetchAll = async () => {
    const query = stringify({ pagination: { pageSize: 100 } });
    try {
      const response = await interceptedAxios.get<ApiResponseList<PriceTier>>(
        `${BASE_PRICETIER_URL}?${query}`
      );
      return response.data.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  return { fetchAll };
};

const priceTierService = createPriceTierService();

export { priceTierService };
