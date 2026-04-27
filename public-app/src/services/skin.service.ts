import { Skin } from "@/types/skin.type";

import axios from "axios";

export async function fetchSkins(q?: string): Promise<Skin[]> {
  try {
    const base = process.env.NEXT_PUBLIC_AXIOS_BASE_URL;
    const query = q ? `q=${encodeURIComponent(q)}` : "limit=500";
    const url = `${base}/api/skins/?${query}`;
    const res = await axios.get(url);
    return res.data.data ?? [];
  } catch {
    return [];
  }
}
