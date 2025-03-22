import {
  AccountEntity,
  AccountEntityRequest,
  FailedJobs,
  RankResponse,
  ResetLogs,
  UpdateResetLogRequest
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

  const fetchFailedJobs = async () => {
    try {
      const response = await interceptedAxios.get<FailedJobs[]>(
        `${BASE_ACCOUNT_URL}/failed-jobs`
      );

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const fetchResetLogs = async () => {
    try {
      const response = await interceptedAxios.get<ResetLogs[]>(
        `${BASE_ACCOUNT_URL}/reset-logs`
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

  const updateResetLogs = async (id: number, data: UpdateResetLogRequest) => {
    try {
      const response = await interceptedAxios.put<MessageResponse>(
        `${BASE_ACCOUNT_URL}/reset-logs/${id}`,
        data
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
    fetchFailedJobs,
    fetchResetLogs,
    create,
    update,
    updateResetLogs,
    deleteMany
  };
};

const accountService = createAccountService();

export { accountService };
