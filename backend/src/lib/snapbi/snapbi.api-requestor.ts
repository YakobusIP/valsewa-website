import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from "axios";
import https from "https";
import SnapBiConfig from "./snapbi.config";
import { HttpHeaders } from "./types";
import { getContextLogger } from "../request-context";
import { env } from "../env";

const snapBiLogger = () => getContextLogger({ component: "snapbi" });

interface ErrorResponse {
  message: string;
  status: number;
  [key: string]: any;
}

function parseUrlParts(url: string): { host?: string; path?: string } {
  try {
    const parsed = new URL(url);
    return { host: parsed.host, path: parsed.pathname };
  } catch {
    return { path: url.split("?")[0] };
  }
}

export default class SnapBiApiRequestor {
  private static axiosInstance: AxiosInstance =
    SnapBiApiRequestor.createAxios();

  private static createAxios(): AxiosInstance {
    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      }),
      validateStatus: (status) => status >= 200 && status < 300
    });

    instance.interceptors.request.use(
      (config) => {
        (config as AxiosRequestConfig & { metadata?: { start: number } }).metadata = {
          start: Date.now()
        };
        return config;
      },
      (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const metadata = (response.config as AxiosRequestConfig & {
          metadata?: { start: number };
        }).metadata;
        const durationMs = metadata ? Date.now() - metadata.start : undefined;
        const urlParts = parseUrlParts(response.config.url ?? "");

        const isSlow =
          durationMs !== undefined &&
          durationMs >= env.SLOW_EXTERNAL_REQUEST_THRESHOLD_MS;

        snapBiLogger()[isSlow ? "warn" : "debug"](
          {
            event: isSlow
              ? "external_request_slow"
              : "external_request_completed",
            provider: "snapbi",
            host: urlParts.host,
            path: urlParts.path,
            statusCode: response.status,
            durationMs,
            slow: isSlow || undefined
          },
          "SnapBI request completed"
        );

        return response;
      },
      (error: AxiosError) => {
        const metadata = (error.config as AxiosRequestConfig & {
          metadata?: { start: number };
        } | undefined)?.metadata;
        const durationMs = metadata ? Date.now() - metadata.start : undefined;
        const urlParts = parseUrlParts(error.config?.url ?? "");

        snapBiLogger().error(
          {
            event: "external_request_failed",
            provider: "snapbi",
            host: urlParts.host,
            path: urlParts.path,
            statusCode: error.response?.status,
            durationMs,
            errorName: error.name,
            errorMessage: error.message
          },
          "SnapBI request failed"
        );

        return Promise.reject(error);
      }
    );

    return instance;
  }

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
