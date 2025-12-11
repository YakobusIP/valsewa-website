import { ApiResponseList, MessageResponse, ApiResponse } from "@/types/api.type";

import { handleAxiosError, interceptedAxios } from "@/lib/axios";
import { Skin, SkinImage, SkinRequest } from "@/types/skin.type";

const BASE_SKIN_URL = "/api/skins";

const createSkinService = () => {
  const fetchAll = async (page?: number, limit?: number, query?: string) => {
    try {
      const response = await interceptedAxios.get<ApiResponseList<Skin>>(
        BASE_SKIN_URL,
        { params: { page, limit, q: query } }
      );
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const create = async (data: SkinRequest) => {
    try {
      const response = await interceptedAxios.post<MessageResponse>(
        BASE_SKIN_URL,
        { ...data }
      );

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const update = async (id: number, data: SkinRequest) => {
    try {
      const response = await interceptedAxios.put<MessageResponse>(
        `${BASE_SKIN_URL}/${id}`,
        { ...data }
      );

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const deleteMany = async (ids: number[]) => {
    try {
      await interceptedAxios.delete(BASE_SKIN_URL, { data: { ids } });
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  
const fetchImage = async (name: string) => {
    try {
      const response = await interceptedAxios.get<ApiResponse<SkinImage>>(
        `${BASE_SKIN_URL}/image`,
        { params: {name}}
      );

      return response.data.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  return { fetchAll, create, update, deleteMany, fetchImage };
};

const skinService = createSkinService();

export { skinService };
