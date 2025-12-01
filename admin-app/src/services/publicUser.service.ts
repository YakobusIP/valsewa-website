import { ApiResponseList, MessageResponse } from "@/types/api.type";

import { handleAxiosError, interceptedAxios } from "@/lib/axios";

export type PublicUserEntity = {
  id: number;
  username: string;
  is_active: boolean;
  createdAt: string;
};

const BASE_PUBLIC_USER_URL = "/api/public-users";

const createPublicUserService = () => {
  const fetchAll = async (page?: number, limit?: number, query?: string) => {
    try {
      const response = await interceptedAxios.get<
        ApiResponseList<PublicUserEntity>
      >(BASE_PUBLIC_USER_URL, {
        params: { page, limit, q: query }
      });

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const create = async (data: { username: string; password: string }) => {
    try {
      const response = await interceptedAxios.post<MessageResponse>(
        BASE_PUBLIC_USER_URL,
        data
      );

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const remove = async (id: number) => {
    try {
      await interceptedAxios.delete(`${BASE_PUBLIC_USER_URL}/${id}`);
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const updatePassword = async (id: number, password: string) => {
    try {
      const response = await interceptedAxios.put<MessageResponse>(
        `${BASE_PUBLIC_USER_URL}/${id}/password`,
        { password }
      );

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  return {
    fetchAll,
    create,
    remove,
    updatePassword
  };
};

const publicUserService = createPublicUserService();

export { publicUserService };
