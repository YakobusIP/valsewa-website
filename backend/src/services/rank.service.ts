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
  private callAPI = async (name: string, tag: string) => {
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
          "Username name and tag are missing!"
        );

      const rankResponse = await this.callAPI(name, tag);

      if (rankResponse) return rankResponse;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new InternalServerError((error as Error).message);
    }
  };

  updateAllAccountsRank = async () => {
    try {
      const account = await prisma.account.findMany();

      const updatePromises = account.map(async (entry) => {
        const [name, tag] = entry.username.split("#");

        if (!name || !tag)
          throw new UnprocessableEntityError(
            "Invalid username format. Expected name#tag"
          );

        try {
          const rankResponse = await this.callAPI(name, tag);

          if (rankResponse) {
            const accountCurrentRank =
              rankResponse.data.current_data.currenttierpatched;

            return prisma.account.update({
              where: { id: entry.id },
              data: { accountRank: accountCurrentRank }
            });
          }

          return null;
        } catch (error) {
          console.error(`Error updating account with id ${entry.id}`, error);
          return null;
        }
      });
      await Promise.allSettled(updatePromises);
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
