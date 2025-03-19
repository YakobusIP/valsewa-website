import axios, { AxiosError } from "axios";
import {
  InternalServerError,
  NotFoundError,
  UnprocessableEntityError
} from "../lib/error";
import { prisma } from "../lib/prisma";
import { env } from "../lib/env";
import { RankDataResponse, RankErrorResponse } from "../types/rank.type";

const HENRIKDEV_BASE_URL = "https://api.henrikdev.xyz/valorant/v2/mmr";
const REGION = "ap";

export class RankService {
  callAPI = async (name: string, tag: string) => {
    try {
      const rankResponse = await axios.get<RankDataResponse>(
        `${HENRIKDEV_BASE_URL}/${REGION}/${name}/${tag}`,
        {
          headers: { Authorization: env.HENRIKDEV_API_KEY }
        }
      );

      return rankResponse.data;
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError && error.response?.data) {
        const responseData = error.response.data as RankErrorResponse;

        if (error.response.status === 500 || error.response.status === 504) {
          throw new UnprocessableEntityError(
            "External API server is unavailable!"
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
