import { ApiResponseError } from "@/types/api.type";

import axios, { AxiosError, AxiosInstance } from "axios";

const LOCALSTORAGE_ACCESS_KEY = "accessToken";

const interceptedAxios: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_BASE_URL
});

export const setAccessToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(LOCALSTORAGE_ACCESS_KEY, token);
    interceptedAxios.defaults.headers.common["Authorization"] =
      `Bearer ${token}`;
  } else {
    localStorage.removeItem(LOCALSTORAGE_ACCESS_KEY);
    delete interceptedAxios.defaults.headers.common["Authorization"];
  }
};

const tokenFromStorage = localStorage.getItem(LOCALSTORAGE_ACCESS_KEY);
if (tokenFromStorage) {
  setAccessToken(tokenFromStorage);
}

interceptedAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCALSTORAGE_ACCESS_KEY);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

interceptedAxios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

const handleAxiosError = (error: unknown) => {
  console.error(error);
  if (error instanceof AxiosError && error.response?.data) {
    const responseData = error.response.data as ApiResponseError;
    return responseData.error.message;
  }
  return "There was a problem with your request.";
};

export { interceptedAxios, handleAxiosError };
