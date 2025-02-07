import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

import { priceTierService } from "@/services/pricetier.service";

import { useToast } from "@/hooks/useToast";

import { PriceTier } from "@/types/pricetier.type";

type PriceTierContextProps = {
  priceTierList: PriceTier[];
  refetchPriceTier: () => Promise<void>;
};

type PriceTierProviderProps = {
  children: ReactNode;
};

export const PriceTierContext = createContext<
  PriceTierContextProps | undefined
>(undefined);

export const PriceTierProvider = ({ children }: PriceTierProviderProps) => {
  const toast = useToast();
  const toastRef = useRef(toast.toast);
  const [priceTierList, setPriceTierList] = useState<PriceTier[]>([]);

  const fetchAllPriceTiers = useCallback(async () => {
    try {
      const response = await priceTierService.fetchAll();
      setPriceTierList(response);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";

      toastRef.current({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: errorMessage
      });
    }
  }, []);
  useEffect(() => {
    fetchAllPriceTiers();
  }, [fetchAllPriceTiers]);

  return (
    <PriceTierContext.Provider
      value={{ priceTierList, refetchPriceTier: fetchAllPriceTiers }}
    >
      {children}
    </PriceTierContext.Provider>
  );
};
