import { handleAxiosError, interceptedAxios } from "@/lib/axios";

const BASE_SETTING_URL = "/api/settings";

export type OperationalHoursEntity = {
  open: string;
  close: string;
  lastOrderBufferInMinutes: number;
  timezone: string;
};

export type UpdateOperationalHoursRequest = {
  open: string;
  close: string;
}

const createSettingService = () => {
  const getSetting = async (key: string) => {
    try {
      const response = await interceptedAxios.get<{
        key: string;
        value: string;
      }>(`${BASE_SETTING_URL}/${key}`);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const updateSetting = async (key: string, value: string) => {
    try {
      const response = await interceptedAxios.put<{
        key: string;
        value: string;
      }>(`${BASE_SETTING_URL}/${key}`, { value });
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const getOperationalHours = async(): Promise<OperationalHoursEntity> => {
    try {
      const response = await interceptedAxios.get<OperationalHoursEntity>(
        `${BASE_SETTING_URL}/operational-hours`
      );
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  }

  const updateOperationalHours = async (data: UpdateOperationalHoursRequest) => {
    try {
      const response = await interceptedAxios.put<{
        key: string;
        value: string;
      }>(`${BASE_SETTING_URL}/operational-hours`, data);
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  return {
    getSetting,
    updateSetting,
    getOperationalHours,
    updateOperationalHours
  };
};

export const settingService = createSettingService();
