import { ApiResponseList, MessageResponse } from "@/types/api.type";
import { PriceTier, PriceTierRequest } from "@/types/pricetier.type";

import { handleAxiosError, interceptedAxios } from "@/lib/axios";

const BASE_PRICETIER_URL = "/api/price-tiers";

const createPriceTierService = () => {
  const fetchAll = async (page: number) => {
    try {
      const response = await interceptedAxios.get<ApiResponseList<PriceTier>>(
        BASE_PRICETIER_URL,
        { params: { page, limit: 100 } }
      );
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const create = async (data: PriceTierRequest) => {
    try {
      const response = await interceptedAxios.post<MessageResponse>(
        BASE_PRICETIER_URL,
        { ...data }
      );

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const update = async (id: number, data: PriceTierRequest) => {
    try {
      const response = await interceptedAxios.put<MessageResponse>(
        `${BASE_PRICETIER_URL}/${id}`,
        { ...data }
      );

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const deleteMany = async (ids: number[]) => {
    try {
      await interceptedAxios.delete(BASE_PRICETIER_URL, { data: { ids } });
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  return { fetchAll, create, update, deleteMany };
};

const priceTierService = createPriceTierService();

export { priceTierService };
