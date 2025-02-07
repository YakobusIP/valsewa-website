import { useContext } from "react";

import { PriceTierContext } from "@/contexts/PriceTierContext";

export const usePriceTier = () => {
  const context = useContext(PriceTierContext);
  if (!context)
    throw new Error("usePriceTier must be used within a PriceTierProvider");
  return context;
};
