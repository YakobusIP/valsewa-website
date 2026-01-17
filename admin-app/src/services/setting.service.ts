import { handleAxiosError, interceptedAxios } from "@/lib/axios";

const BASE_SETTING_URL = "/api/settings";

const createSettingService = () => {
  const getSetting = async (key: string) => {
    try {
      const response = await interceptedAxios.get<{ key: string; value: string }>(
        `${BASE_SETTING_URL}/${key}`
      );
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const updateSetting = async (key: string, value: string) => {
    try {
      const response = await interceptedAxios.put<{ key: string; value: string }>(
        `${BASE_SETTING_URL}/${key}`,
        { value }
      );
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  return {
    getSetting,
    updateSetting
  };
};

export const settingService = createSettingService();
