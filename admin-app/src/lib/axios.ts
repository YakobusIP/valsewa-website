import { ApiResponseError } from "@/types/api.type";

import axios, { AxiosError, AxiosInstance } from "axios";
import type { AxiosRequestConfig } from "axios";

let isRefreshing = false;
let failedQueue: Array<{
  resolve: () => void;
  reject: (error: unknown) => void;
}> = [];

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry: boolean;
}

const interceptedAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL,
  withCredentials: true
});

/**
 * Processes the queue of failed requests after token refresh.
 * @param error Any error that occurred during the refresh.
 */
const processQueue = (error: unknown) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve();
    }
  });
  failedQueue = [];
};

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
          return new Promise<void>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              return interceptedAxios(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }
      }

      isRefreshing = true;

      return new Promise((resolve, reject) => {
        axios
          .post(
            `${import.meta.env.VITE_AXIOS_BASE_URL}/api/auth/refresh-token`,
            null,
            {
              withCredentials: true
            }
          )
          .then(() => {
            processQueue(null);
            resolve(interceptedAxios(originalRequest));
          })
          .catch((refreshError) => {
            processQueue(refreshError);
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
