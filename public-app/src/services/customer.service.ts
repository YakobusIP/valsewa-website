import { interceptedAxios } from "@/lib/axios";

const BASE_URL = process.env.NEXT_PUBLIC_AXIOS_BASE_URL;

const createCustomerService = () => {
  const getMyStreak = async (): Promise<{ currentStreak: number }> => {
    try {
      const response = await interceptedAxios.get<{ currentStreak: number }>(
        `${BASE_URL}/api/customer/me/streak`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching streak:", error);
      throw error;
    }
  };

  return { getMyStreak };
};

const customerService = createCustomerService();

export { customerService };
