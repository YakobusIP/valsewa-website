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

export const isCanceledError = (
  error: unknown
): error is Error & { code: string } => {
  return (
    error instanceof Error &&
    (error.name === "CanceledError" ||
      ("code" in error && (error as { code: string }).code === "ERR_CANCELED"))
  );
};

const createAccountService = () => {
  const fetchAll = async (
    page: number,
    limit: number,
    query: string,
    sortBy: string,
    direction: SORT_ORDER,
    signal?: AbortSignal
  ) => {
    try {
      const response = await interceptedAxios.get<
        ApiResponseList<AccountEntity>
      >(BASE_ACCOUNT_URL, {
        params: { page, limit, q: query, sortBy, direction },
        signal
      });

      return response.data;
    } catch (error) {
      if (isCanceledError(error)) {
        throw error;
      }
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

  const fetchAvailableAccounts = async (startAt: Date, endAt: Date) => {
    try {
      const response = await interceptedAxios.get<AccountEntity[]>(
        `${BASE_ACCOUNT_URL}/available`,
        {
          params: {
            startAt,
            endAt
          }
        }
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

  const finishBooking = async (id: number) => {
    try {
      const response = await interceptedAxios.put<MessageResponse>(
        `${BASE_ACCOUNT_URL}/finish-booking/${id}`
      );

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const update = async (
    id: number,
    data: Partial<AccountEntityRequest>,
    deleteResetLogs?: boolean
  ) => {
    try {
      const response = await interceptedAxios.put<MessageResponse>(
        `${BASE_ACCOUNT_URL}/${id}`,
        { ...data },
        { params: { deleteResetLogs } }
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
    fetchAvailableAccounts,
    create,
    finishBooking,
    update,
    updateResetLogs,
    deleteMany
  };
};

const accountService = createAccountService();

export { accountService };
