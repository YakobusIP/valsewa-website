import { PublicDailyDrop } from "@/types/dailydrop.type";
import axios from "axios";

export async function fetchPublicDailyDrops(): Promise<PublicDailyDrop[]> {
  try {
    const url = `${process.env.NEXT_PUBLIC_AXIOS_BASE_URL}/api/daily-drop/public`;
    const response = await axios.get(url);
    return response.data.data ?? [];
  } catch (error) {
    console.error("Error fetching daily drops:", error);
    return [];
  }
}
