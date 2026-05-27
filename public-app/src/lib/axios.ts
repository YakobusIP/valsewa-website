import { ApiResponseError } from "@/types/api.type";

import { shouldRefreshAccessToken } from "@/lib/auth-token";

import axios, { AxiosError, AxiosInstance } from "axios";
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

let accessToken: string | null = null;
let refreshPromise: Promise<string> | null = null;
let sessionEpoch = 0;

let sessionExpiredListener: (() => void) | null = null;

const SESSION_ENDED_DURING_REFRESH = "Session ended during refresh";

const invalidateSession = () => {
  sessionEpoch += 1;
  refreshPromise = null;
};

const REFRESH_URL = "/api/auth/pubrefresh-token";
const LOGIN_URL_FRAGMENT = "auth/publogin";
const LOGOUT_URL_FRAGMENT = "auth/publogout";
const REFRESH_URL_FRAGMENT = "auth/pubrefresh-token";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const interceptedAxios: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AXIOS_BASE_URL
});

export const setSessionExpiredListener = (listener: (() => void) | null) => {
  sessionExpiredListener = listener;
};

export const setAccessToken = (token: string | null) => {
  accessToken = token;

  if (token) {
    interceptedAxios.defaults.headers.common["Authorization"] =
      `Bearer ${token}`;
  } else {
    delete interceptedAxios.defaults.headers.common["Authorization"];
  }
};

const getStoredRefreshToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refreshToken");
};

const clearStoredSession = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("refreshToken");
  }
  invalidateSession();
  setAccessToken(null);
  sessionExpiredListener?.();
};

export const clearLocalAuthSession = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("refreshToken");
  }
  invalidateSession();
  setAccessToken(null);
};

const isSessionStillValid = (
  epochAtStart: number,
  refreshTokenUsed: string
): boolean =>
  sessionEpoch === epochAtStart && getStoredRefreshToken() === refreshTokenUsed;

const isAuthExemptUrl = (config?: CustomAxiosRequestConfig): boolean => {
  if (!config?.url) return false;
  const url = config.url;
  return (
    url.includes(LOGIN_URL_FRAGMENT) ||
    url.includes(LOGOUT_URL_FRAGMENT) ||
    url.includes(REFRESH_URL_FRAGMENT)
  );
};

const stripAuthorizationHeader = (config: InternalAxiosRequestConfig) => {
  if (!config.headers) return;
  delete config.headers.Authorization;
  delete config.headers.authorization;
};

export const refreshAccessToken = async (): Promise<string> => {
  if (refreshPromise) {
    return refreshPromise;
  }

  const refreshToken = getStoredRefreshToken();
  if (!refreshToken) {
    clearStoredSession();
    throw new Error("No refresh token available");
  }

  const epochAtStart = sessionEpoch;

  const inFlightRefresh = (async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_AXIOS_BASE_URL}${REFRESH_URL}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${refreshToken}`
          }
        }
      );

      if (!isSessionStillValid(epochAtStart, refreshToken)) {
        throw new Error(SESSION_ENDED_DURING_REFRESH);
      }

      const newAccessToken = response.data.pubAccessToken as string;
      setAccessToken(newAccessToken);
      return newAccessToken;
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === SESSION_ENDED_DURING_REFRESH
      ) {
        throw error;
      }
      clearStoredSession();
      throw error;
    }
  })();

  refreshPromise = inFlightRefresh;

  void inFlightRefresh.then(
    () => {
      if (refreshPromise === inFlightRefresh) refreshPromise = null;
    },
    () => {
      if (refreshPromise === inFlightRefresh) refreshPromise = null;
    }
  );

  return inFlightRefresh;
};

export const restoreSessionFromRefreshToken = async (): Promise<
  string | null
> => {
  if (accessToken) return accessToken;
  if (!getStoredRefreshToken()) return null;

  try {
    return await refreshAccessToken();
  } catch {
    return null;
  }
};

interceptedAxios.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (isAuthExemptUrl(config)) {
      stripAuthorizationHeader(config);
      return config;
    }

    const storedRefreshToken = getStoredRefreshToken();
    if (storedRefreshToken && shouldRefreshAccessToken(accessToken)) {
      await refreshAccessToken();
    }

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

interceptedAxios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | CustomAxiosRequestConfig
      | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 403) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !isAuthExemptUrl(originalRequest) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return interceptedAxios(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const handleAxiosError = (error: unknown) => {
  console.error(error);
  if (error instanceof AxiosError && error.response?.data) {
    const responseData = error.response.data as ApiResponseError;
    return responseData.error;
  }
  return "There was a problem with your request.";
};

export { interceptedAxios, handleAxiosError };
