import axios from "axios";

export async function fetchAccounts(
  search: string,
  direction: string,
  sortBy: string
) {
  try {
    const url = `${
      process.env.NEXT_PUBLIC_AXIOS_BASE_URL
    }/api/accounts?page=1&limit=100&q=${encodeURIComponent(
      search
    )}&sortBy=${encodeURIComponent(sortBy)}&direction=${encodeURIComponent(
      direction
    )}`;

    const response = await axios.get(url, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
      params: {
        _: new Date().getTime(), 
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
