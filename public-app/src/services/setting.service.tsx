
import { OperationalHoursEntity } from "@/types/setting.type";
import axios from "axios";


export async function fetchOperationalHours(): Promise<OperationalHoursEntity | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_AXIOS_BASE_URL}/api/settings/operational-hours`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
