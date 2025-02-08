import { StatisticResponse } from "@/types/statistic.type";

import { handleAxiosError, interceptedAxios } from "@/lib/axios";

const BASE_STATISTIC_URL = "/api/statistics";

const createStatisticService = () => {
  const fetchAll = async () => {
    try {
      const response =
        await interceptedAxios.get<StatisticResponse>(BASE_STATISTIC_URL);

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  return { fetchAll };
};

const statisticService = createStatisticService();

export { statisticService };
