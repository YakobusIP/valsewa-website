import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState
} from "react";

import { authService } from "@/services/auth.service";

import { toast } from "@/hooks/useToast";

import { loginFormSchema } from "@/types/zod.type";

import { useLocation, useNavigate } from "react-router";
import { z } from "zod";

type AuthContextProps = {
  isLoadingLogin: boolean;
  isAuthenticated: boolean;
  username: string;
  login: (values: z.infer<typeof loginFormSchema>) => Promise<void>;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (values: z.infer<typeof loginFormSchema>) => {
    setIsLoadingLogin(true);
    try {
      const response = await authService.login(values);
      setIsAuthenticated(true);
      setUsername(response.username);
      navigate("/dashboard");

      toast({
        title: "All set!",
        description: "Login successful"
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: errorMessage
      });
    } finally {
      setIsLoadingLogin(false);
    }
  };

  const validateToken = useCallback(async () => {
    try {
      const response = await authService.validateToken();
      setUsername(response.username);
      setIsAuthenticated(true);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occured";

      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong!",
        description: errorMessage
      });

      setIsAuthenticated(false);
      navigate("/unauthorized");
    }
  }, [navigate]);

  useEffect(() => {
    if (location.pathname === "/") return;
    validateToken();
  }, [validateToken, location.pathname]);

  return (
    <AuthContext.Provider
      value={{
        isLoadingLogin,
        isAuthenticated,
        username,
        login
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
