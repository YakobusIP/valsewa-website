import { ApiResponseError } from "@/types/api.type";

import axios, { AxiosError, AxiosInstance } from "axios";
import type { AxiosRequestConfig } from "axios";

let accessToken: string | null = null;
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string) => void;
  reject: (error: unknown) => void;
}> = [];

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry: boolean;
}

const interceptedAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL
});

export const setAccessToken = (token: string | null) => {
  if (token) {
    accessToken = token;
    interceptedAxios.defaults.headers.common["Authorization"] =
      `Bearer ${token}`;
  } else {
    delete interceptedAxios.defaults.headers.common["Authorization"];
  }
};

/**
 * Processes the queue of failed requests after token refresh.
 * @param error Any error that occurred during the refresh.
 */
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

interceptedAxios.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

interceptedAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 403) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest.url?.includes("auth/login") &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (error.response.status === 401) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
              }
              return interceptedAxios(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }
      }

      isRefreshing = true;

      return new Promise((resolve, reject) => {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) reject(new Error("No refresh token available"));
        axios
          .post(
            `${import.meta.env.VITE_AXIOS_BASE_URL}/api/auth/refresh-token`,
            null,
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`
              }
            }
          )
          .then((response) => {
            const newAccessToken = response.data.accessToken;
            setAccessToken(newAccessToken);

            const newRefreshToken = response.data.refreshToken;
            localStorage.setItem("refreshToken", newRefreshToken);

            processQueue(null, newAccessToken);
            if (originalRequest.headers) {
              originalRequest.headers["Authorization"] =
                `Bearer ${newAccessToken}`;
            }
            resolve(interceptedAxios(originalRequest));
          })
          .catch((refreshError) => {
            localStorage.removeItem("refreshToken");
            processQueue(refreshError, null);
            reject(refreshError);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
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
