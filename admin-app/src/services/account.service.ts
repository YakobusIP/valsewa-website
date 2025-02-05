import { AccountEntity, AccountEntityRequest } from "@/types/account.type";
import { ApiResponseList, PaginationMetadata } from "@/types/api.type";

import { handleAxiosError, interceptedAxios } from "@/lib/axios";

import { stringify } from "qs";

const BASE_ACCOUNT_URL = "/api/accounts";

const createAccountService = () => {
  const fetchAll = async () => {
    const query = stringify(
      {
        populate: {
          thumbnail: {
            fields: ["id", "url"]
          },
          price_tier: {
            fields: ["id", "code", "description"]
          },
          other_images: {
            fields: ["id", "url"]
          }
        }
      },
      { encodeValuesOnly: true }
    );
    try {
      const response = await interceptedAxios.get<
        ApiResponseList<AccountEntity>
      >(`${BASE_ACCOUNT_URL}?${query}`);
      return [response.data.data, response.data.meta.pagination] as [
        AccountEntity[],
        PaginationMetadata
      ];
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const create = async (data: AccountEntityRequest) => {
    try {
      await interceptedAxios.post(`${BASE_ACCOUNT_URL}`, { data });
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const update = async (data: AccountEntity) => {
    try {
      await interceptedAxios.put(`${BASE_ACCOUNT_URL}/${data.id}`, { data });
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const deleteMany = async (ids: string[]) => {
    try {
      const query = stringify({ ids });
      await interceptedAxios.delete(`${BASE_ACCOUNT_URL}?${query}`);
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  return { fetchAll, create, update, deleteMany };
};

const accountService = createAccountService();

export { accountService };
