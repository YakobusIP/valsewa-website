import axios from "axios";

export async function fetchAccounts(
  search: string,
  direction: string,
  sortBy: string
) {
  try {
    const url = `${
      process.env.NEXT_PUBLIC_AXIOS_BASE_URL
    }/api/accounts/public?page=1&limit=1000&q=${encodeURIComponent(
      search
    )}&sortBy=${encodeURIComponent(sortBy)}&direction=${encodeURIComponent(
      direction
    )}`;
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}

export async function fetchCarousel() {
  try {
    const url = `${process.env.NEXT_PUBLIC_AXIOS_BASE_URL}/api/carousels`;
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
