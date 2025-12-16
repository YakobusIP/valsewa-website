import axios, { AxiosError } from "axios";
import {
  InternalServerError,
  NotFoundError,
  UnprocessableEntityError
} from "../lib/error";
import { WeaponsResponse, Weapon, SkinPayload } from "../types/image.type";

const VALORANT_WEAPONS_URL = "https://valorant-api.com/v1/weapons";

export class ImageService {
  callAPI = async (): Promise<WeaponsResponse> => {
    try {
      const response = await axios.get<WeaponsResponse>(VALORANT_WEAPONS_URL, {
        timeout: 10_000
      });
      return response.data;
    } catch (error) {
      console.error(error);
      if (error instanceof AxiosError && error.response?.data) {
        const status = error.response?.status ?? 0;

        if (status === 429) {
          throw new UnprocessableEntityError(
            "External API rate limit reached!"
          );
        }
        if (status >= 500) {
          throw new UnprocessableEntityError(
            "External API server is unavailable!"
          );
        }
      }
      throw new InternalServerError((error as Error).message);
    }
  };

  getSkinImage = async (
    name: string
  ): Promise<{ name: string; imageUrl: string }> => {
    try {
      const q = name?.trim();
      if (!q) throw new UnprocessableEntityError("Skin name is required!");

      const payload = await this.callAPI();
      const weapons = Array.isArray(payload?.data) ? payload.data : [];

      const skins: SkinPayload[] = weapons
        .flatMap((w) => (Array.isArray(w?.skins) ? w.skins! : []))
        .filter(Boolean);

      const norm = (s?: string) => (s ?? "").trim().toLowerCase();

      let matched = skins.find((s) => norm(s.displayName) === norm(q));

      if (!matched) {
        matched = skins.find((s) => norm(s.displayName).includes(norm(q)));
      }

      if (!matched) {
        throw new NotFoundError(`Skin "${q}" not found in weapons data.`);
      }

      const imageUrl =
        matched.levels?.find((l) => !!l.displayIcon)?.displayIcon ??
        matched.chromas?.find((c) => !!c.fullRender)?.fullRender ??
        null;

      if (!imageUrl) {
        throw new NotFoundError(
          `Image for skin "${matched.displayName}" not found.`
        );
      }

      return { name: matched.displayName!, imageUrl };
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
