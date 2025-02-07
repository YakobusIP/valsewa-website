import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useState
} from "react";

import { priceTierService } from "@/services/pricetier.service";

import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/useToast";

import { MetadataResponse } from "@/types/api.type";
import { PriceTier } from "@/types/pricetier.type";

type PriceTierContextProps = {
  priceTierList: PriceTier[];
  priceTierMetadata?: MetadataResponse;
  isLoadingPriceTier: boolean;
  priceTierListPage: number;
  setPriceTierListPage: Dispatch<SetStateAction<number>>;
  refetchPriceTier: () => Promise<void>;
};

type PriceTierProviderProps = {
  children: ReactNode;
};

export const PriceTierContext = createContext<
  PriceTierContextProps | undefined
>(undefined);

export const PriceTierProvider = ({ children }: PriceTierProviderProps) => {
  const { isLoadingLogin, isAuthenticated } = useAuth();

  const [isLoadingPriceTier, setIsLoadingPriceTier] = useState(false);
  const [priceTierList, setPriceTierList] = useState<PriceTier[]>([]);
  const [priceTierMetadata, setPriceTierMetadata] =
    useState<MetadataResponse>();
  const [priceTierListPage, setPriceTierListPage] = useState(1);

  const fetchAllPriceTiers = useCallback(async () => {
    setIsLoadingPriceTier(true);
    try {
      const response = await priceTierService.fetchAll(priceTierListPage);
      setPriceTierList(response.data);
      setPriceTierMetadata(response.metadata);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: errorMessage
      });
    } finally {
      setIsLoadingPriceTier(false);
    }
  }, [priceTierListPage]);

  useEffect(() => {
    if (!isLoadingLogin && isAuthenticated) {
      fetchAllPriceTiers();
    }
  }, [isLoadingLogin, isAuthenticated, fetchAllPriceTiers]);

  return (
    <PriceTierContext.Provider
      value={{
        priceTierList,
        priceTierMetadata,
        isLoadingPriceTier,
        priceTierListPage,
        setPriceTierListPage,
        refetchPriceTier: fetchAllPriceTiers
      }}
    >
      {children}
    </PriceTierContext.Provider>
  );
};
