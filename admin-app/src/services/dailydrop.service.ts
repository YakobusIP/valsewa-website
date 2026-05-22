import { MessageResponse } from "@/types/api.type";
import {
  DailyDropConfigEntity,
  DailyDropSlotEntity,
  UpsertDailyDropConfigPayload
} from "@/types/dailydrop.type";

import { handleAxiosError, interceptedAxios } from "@/lib/axios";

const BASE_URL = "/api/daily-drop";

const createDailyDropService = () => {
  const getConfig = async () => {
    try {
      const response = await interceptedAxios.get<{
        data: DailyDropConfigEntity | null;
      }>(`${BASE_URL}/config`);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const upsertConfig = async (data: UpsertDailyDropConfigPayload) => {
    try {
      const response = await interceptedAxios.post<MessageResponse>(
        `${BASE_URL}/config`,
        data
      );
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const triggerRandomizer = async () => {
    try {
      const response = await interceptedAxios.post<MessageResponse>(
        `${BASE_URL}/trigger`
      );
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const getAdminDrops = async () => {
    try {
      const response = await interceptedAxios.get<{
        data: DailyDropSlotEntity[];
      }>(`${BASE_URL}/admin`);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  return { getConfig, upsertConfig, triggerRandomizer, getAdminDrops };
};

export const dailyDropService = createDailyDropService();
