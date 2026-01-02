import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from "axios";
import https from "https";
import SnapBiConfig from "./snapbi.config";
import { HttpHeaders } from "./types";

interface ErrorResponse {
  message: string;
  status: number;
  [key: string]: any;
}

export default class SnapBiApiRequestor {
  private static axiosInstance: AxiosInstance =
    SnapBiApiRequestor.createAxios();

  /* ==========================
   * AXIOS INITIALIZATION
   * ========================== */
  private static createAxios(): AxiosInstance {
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false // ⚠️ keep as-is (Snap BI behavior)
      }),
      validateStatus: (status) => status >= 200 && status < 300
    });

    /* ==========================
     * REQUEST INTERCEPTOR
     * ========================== */
    instance.interceptors.request.use(
      (config) => {
        if (SnapBiConfig.enableLogging) {
          console.log(`➡️  Request URL: ${config.url}`);
          console.log(
            `➡️  Headers:\n${JSON.stringify(config.headers, null, 2)}`
          );
          if (config.data) {
            console.log(`➡️  Body:\n${JSON.stringify(config.data, null, 2)}`);
          }
        }
        return config;
      },
      (error) => {
        if (SnapBiConfig.enableLogging) {
          console.error(`❌ Request Error: ${error.message}`);
        }
        return Promise.reject(error);
      }
    );

    /* ==========================
     * RESPONSE INTERCEPTOR
     * ========================== */
    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (SnapBiConfig.enableLogging) {
          console.log(`⬅️  Status: ${response.status}`);
          console.log(`⬅️  Body:\n${JSON.stringify(response.data, null, 2)}`);
        }
        return response;
      },
      (error: AxiosError) => {
        if (SnapBiConfig.enableLogging) {
          console.error(`❌ Response Error: ${error.message}`);
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }

  /* ==========================
   * PUBLIC API
   * ========================== */
  static async remoteCall<T = any>(
    url: string,
    headers: HttpHeaders,
    body: any,
    timeout = 10_000
  ): Promise<T | ErrorResponse> {
    const config: AxiosRequestConfig = {
      headers,
      timeout
    };

    try {
      const response = await this.axiosInstance.post<T>(url, body, config);
      return response.data;
    } catch (error) {
      return this.normalizeError(error);
    }
  }

  /* ==========================
   * ERROR HANDLING
   * ========================== */
  private static normalizeError(error: any): ErrorResponse {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response.data as ErrorResponse;
      }

      return {
        message: error.message,
        status: error.code ? Number(error.code) : 500
      };
    }

    return {
      message: "Unknown error occurred",
      status: 500
    };
  }
}
