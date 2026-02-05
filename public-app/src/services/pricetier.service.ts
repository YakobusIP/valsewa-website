import { PublicPricesResponse } from "@/types/pricetier.type";

import axios from "axios";

const createPriceTierService = () => {
  const fetchPublicPrices = async (): Promise<PublicPricesResponse | null> => {
    try {
      const url = `${process.env.NEXT_PUBLIC_AXIOS_BASE_URL}/api/price-tiers/public/prices`;
      const response = await axios.get<{ data: PublicPricesResponse }>(url);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching public prices:", error);
      return null;
    }
  };

  return { fetchPublicPrices };
};

const priceTierService = createPriceTierService();

export { priceTierService };
