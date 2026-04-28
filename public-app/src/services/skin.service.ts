import { Skin } from "@/types/skin.type";

import axios from "axios";

export async function fetchSkins(
  q?: string,
  limit: number = 50
): Promise<Skin[]> {
  try {
    const base = process.env.NEXT_PUBLIC_AXIOS_BASE_URL;
    const params = new URLSearchParams();
    params.append("limit", limit.toString());
    if (q) {
      params.append("q", q);
    }
    const url = `${base}/api/skins/?${params.toString()}`;
    const res = await axios.get(url);
    return res.data.data ?? [];
  } catch {
    return [];
  }
}
