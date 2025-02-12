import axios from "axios";

export async function fetchAccounts(
  search: string,
  direction: string,
  sortBy: string
) {
  try {
    const url = `http://localhost:5000/api/accounts?page=1&limit=100&q=${encodeURIComponent(
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
