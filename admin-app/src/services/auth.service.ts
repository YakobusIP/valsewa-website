import { handleAxiosError, interceptedAxios } from "@/lib/axios";

const BASE_AUTH_URL = "/api/auth";

type LoginRequest = {
  identifier: string;
  password: string;
};

type LoginResponse = {
  jwt: string;
  user: { id: number; username: string };
};

const createAuthService = () => {
  const login = async (data: LoginRequest) => {
    try {
      const response = await interceptedAxios.post<LoginResponse>(
        `${BASE_AUTH_URL}/local`,
        data
      );

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  return { login };
};

const authService = createAuthService();

export { authService };
