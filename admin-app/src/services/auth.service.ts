import { MessageResponse } from "@/types/api.type";
import {
  LoginRequest,
  LoginResponse,
  ValidateResponse
} from "@/types/auth.type";

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

  const validateToken = async () => {
    try {
      const response = await interceptedAxios.get<ValidateResponse>(
        `${BASE_AUTH_URL}/validate-token`
      );

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  return { login, logout, validateToken };
};

const authService = createAuthService();

export { authService };
