import {
  AccountEntity,
  AccountEntityRequest,
  RankResponse
} from "@/types/account.type";
import { ApiResponseList, MessageResponse } from "@/types/api.type";

import { handleAxiosError, interceptedAxios } from "@/lib/axios";
import { SORT_ORDER } from "@/lib/enums";

const BASE_ACCOUNT_URL = "/api/accounts";

const createAccountService = () => {
  const fetchAll = async (
    page: number,
    limit: number,
    query: string,
    sortBy: string,
    direction: SORT_ORDER
  ) => {
    try {
      const response = await interceptedAxios.get<
        ApiResponseList<AccountEntity>
      >(BASE_ACCOUNT_URL, {
        params: { page, limit, q: query, sortBy, direction }
      });

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

  const fetchDuplicate = async (name: string, tag: string, code: string) => {
    try {
      const response = await interceptedAxios.get<{ exists: boolean }>(
        `${BASE_ACCOUNT_URL}/duplicate/${name}/${tag}/${code}`
      );

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const create = async (data: Partial<AccountEntityRequest>) => {
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
    fetchDuplicate,
    create,
    update,
    deleteMany
  };
};

const accountService = createAccountService();

export { accountService };
