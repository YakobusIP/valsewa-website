import axios, { AxiosError } from "axios";
import {
  InternalServerError,
  NotFoundError,
  UnprocessableEntityError
} from "../lib/error";
import { env } from "../lib/env";
import { RankDataResponse, RankErrorResponse } from "../types/rank.type";
import { getContextLogger } from "../lib/request-context";

const HENRIKDEV_BASE_URL = "https://api.henrikdev.xyz/valorant/v2/mmr";
const REGION = "ap";

const rankLogger = () =>
  getContextLogger({ component: "rank", provider: "henrikdev" });

export class RankService {
  callAPI = async (name: string, tag: string) => {
    const start = Date.now();

    try {
      const rankResponse = await axios.get<RankDataResponse>(
        `${HENRIKDEV_BASE_URL}/${REGION}/${name}/${tag}`,
        {
          headers: { Authorization: env.HENRIKDEV_API_KEY },
          timeout: 15_000
        }
      );

      const durationMs = Date.now() - start;
      const isSlow = durationMs >= env.SLOW_EXTERNAL_REQUEST_THRESHOLD_MS;

      rankLogger()[isSlow ? "warn" : "debug"](
        {
          event: isSlow
            ? "external_request_slow"
            : "external_request_completed",
          provider: "henrikdev",
          statusCode: rankResponse.status,
          durationMs,
          slow: isSlow || undefined
        },
        "HenrikDev API request completed"
      );

      return rankResponse.data;
    } catch (error) {
      const durationMs = Date.now() - start;
      const axiosError = error as AxiosError;
      const statusCode = axiosError.response?.status;

      rankLogger().error(
        {
          event: "external_request_failed",
          provider: "henrikdev",
          statusCode,
          durationMs,
          errorName: (error as Error).name,
          errorMessage: (error as Error).message
        },
        "HenrikDev API request failed"
      );

      if (axiosError.response?.data) {
        const responseData = axiosError.response.data as RankErrorResponse;

        if (statusCode === 500 || statusCode === 504) {
          throw new UnprocessableEntityError(
            "External API server is unavailable!"
          );
        }

        if (statusCode === 429) {
          throw new UnprocessableEntityError(
            "External API rate limit reached!"
          );
        }

        const errorData = responseData.errors[0];

        if (errorData.status === 404) {
          throw new NotFoundError(errorData.message);
        }
      }
      throw new InternalServerError((error as Error).message);
    }
  };

  getSingleAccountRank = async (name: string, tag: string) => {
    try {
      if (!name || !tag)
        throw new UnprocessableEntityError(
          "Nickname name and tag are missing!"
        );

      const rankResponse = await this.callAPI(name, tag);

      if (rankResponse) return rankResponse;
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof UnprocessableEntityError
      ) {
        throw error;
      }

      throw new InternalServerError((error as Error).message);
    }
  };
}
