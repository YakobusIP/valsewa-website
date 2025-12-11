import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useEffect,
  useState
} from "react";

import { skinService } from "@/services/skin.service";

import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/useToast";

import { MetadataResponse } from "@/types/api.type";
import { Skin } from "@/types/skin.type";

type SkinContextProps = {
  skinList: Skin[];
  skinMetadata?: MetadataResponse;
  isLoadingSkin: boolean;
  skinListPage: number;
  setSkinListPage: Dispatch<SetStateAction<number>>;
  setSkinSearch: Dispatch<SetStateAction<string>>;
  refetchSkin: () => Promise<void>;
};

type SkinProviderProps = {
  children: ReactNode;
};

const PAGINATION_SIZE = 5;

export const SkinContext = createContext<
  SkinContextProps | undefined
>(undefined);

export const SkinProvider = ({ children }: SkinProviderProps) => {
  const { isLoadingLogin, isAuthenticated } = useAuth();

  const [isLoadingSkin, setIsLoadingSkin] = useState(false);
  const [skinList, setSkinList] = useState<Skin[]>([]);
  const [skinMetadata, setSkinMetadata] =
    useState<MetadataResponse>();
  const [skinListPage, setSkinListPage] = useState(1);

  const [skinSearch, setSkinSearch] = useState("");

  const fetchAllSkins = useCallback(async () => {
    setIsLoadingSkin(true);
    try {
      const response = await skinService.fetchAll(
        skinListPage,
        PAGINATION_SIZE,
        skinSearch
      );
      setSkinList(response.data);
      setSkinMetadata(response.metadata);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: errorMessage
      });
    } finally {
      setIsLoadingSkin(false);
    }
  }, [skinListPage, skinSearch]);

  useEffect(() => {
    if (!isLoadingLogin && isAuthenticated) {
      fetchAllSkins();
    }
  }, [isLoadingLogin, isAuthenticated, fetchAllSkins]);

  return (
    <SkinContext.Provider
      value={{
        skinList,
        skinMetadata,
        isLoadingSkin,
        skinListPage,
        setSkinListPage,
        setSkinSearch,
        refetchSkin: fetchAllSkins
      }}
    >
      {children}
    </SkinContext.Provider>
  );
};
