import { useContext } from "react";

import { SkinContext } from "@/contexts/SkinContext";

export const useSkin = () => {
  const context = useContext(SkinContext);
  if (!context)
    throw new Error("useSkin must be used within a SkinProvider");
  return context;
};
