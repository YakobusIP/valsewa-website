import { loginFormSchema } from "@/types/zod.type";

import { z } from "zod";

export type AuthContextType = {
  isLoadingLogin: boolean;
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  username: string | null;
  login: (values: z.infer<typeof loginFormSchema>) => Promise<void>;
  logout: () => void;
};
