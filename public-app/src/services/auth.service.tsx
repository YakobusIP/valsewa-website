import { MessageResponse } from "@/types/api.type";
import {
  LoginRequest,
  LoginResponse,
  ValidateResponse
} from "@/types/auth.type";

import {
  handleAxiosError,
  interceptedAxios,
  setAccessToken
} from "@/lib/axios";

const BASE_AUTH_URL = "/api/auth";

const createAuthService = () => {
  const login = async (data: LoginRequest) => {
    try {
      const response = await interceptedAxios.post<LoginResponse>(
        `${BASE_AUTH_URL}/publogin`,
        data
      );

      const { pubAccessToken, pubRefreshToken } = response.data;
      localStorage.setItem("refreshToken", pubRefreshToken);
      setAccessToken(pubAccessToken);

      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const logout = async () => {
    try {
      const response = await interceptedAxios.post<MessageResponse>(
        `${BASE_AUTH_URL}/publogout`
      );
      return response.data;
    } catch (error) {
      throw new Error(handleAxiosError(error));
    }
  };

  const validateToken = async () => {
    try {
      const response = await interceptedAxios.get<ValidateResponse>(
        `${BASE_AUTH_URL}/pubvalidate-token`
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
