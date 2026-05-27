import { MessageResponse } from "@/types/api.type";
import { LoginRequest, LoginResponse } from "@/types/auth.type";

import { handleAxiosError, interceptedAxios } from "@/lib/axios";

const BASE_AUTH_URL = "/api/auth";

const createAuthService = () => {
  const login = async (data: LoginRequest) => {
    try {
      const response = await interceptedAxios.post<LoginResponse>(
        `${BASE_AUTH_URL}/login`,
        data
      );

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const logout = async () => {
    try {
      const response = await interceptedAxios.post<MessageResponse>(
        `${BASE_AUTH_URL}/logout`
      );
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  return { login, logout };
};

const authService = createAuthService();

export { authService };
