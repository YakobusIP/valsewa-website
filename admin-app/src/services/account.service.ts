import {
  AccountEntity,
  AccountEntityRequest,
  RankResponse
} from "@/types/account.type";
import { ApiResponseList, MessageResponse } from "@/types/api.type";

import { handleAxiosError, interceptedAxios } from "@/lib/axios";
import { AVAILABILITY_STATUS } from "@/lib/enums";

const BASE_ACCOUNT_URL = "/api/accounts";

const createAccountService = () => {
  const fetchAll = async (page: number, query: string) => {
    try {
      const response = await interceptedAxios.get<
        ApiResponseList<AccountEntity>
      >(BASE_ACCOUNT_URL, { params: { page, limit: 100, q: query } });

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const fetchRank = async (name: string, tag: string) => {
    try {
      const response = await interceptedAxios.get<RankResponse>(
        `${BASE_ACCOUNT_URL}/rank/${name}/${tag}`
      );

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const create = async (data: AccountEntityRequest) => {
    try {
      const response = await interceptedAxios.post<MessageResponse>(
        BASE_ACCOUNT_URL,
        { ...data }
      );

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const update = async (id: number, data: Partial<AccountEntityRequest>) => {
    try {
      const response = await interceptedAxios.put<MessageResponse>(
        `${BASE_ACCOUNT_URL}/${id}`,
        { ...data }
      );

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const updateAvailability = async (id: number, data: AVAILABILITY_STATUS) => {
    try {
      const response = await interceptedAxios.put<MessageResponse>(
        `${BASE_ACCOUNT_URL}/${id}`,
        { availabilityStatus: data }
      );

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const deleteMany = async (ids: number[]) => {
    try {
      await interceptedAxios.delete(BASE_ACCOUNT_URL, { data: { ids } });
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  return {
    fetchAll,
    fetchRank,
    create,
    update,
    updateAvailability,
    deleteMany
  };
};

const accountService = createAccountService();

export { accountService };
