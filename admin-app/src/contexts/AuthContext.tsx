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

import { decodeAdminAccessToken } from "@/lib/auth-token";
import {
  clearLocalAuthSession,
  restoreSessionFromRefreshToken,
  setAccessToken,
  setSessionExpiredListener
} from "@/lib/axios";

import { useLocation, useNavigate } from "react-router";
import { z } from "zod";

type AuthContextProps = {
  isLoadingLogin: boolean;
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  username: string;
  login: (values: z.infer<typeof loginFormSchema>) => Promise<void>;
  logout: () => Promise<void>;
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
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const applySessionFromAccessToken = useCallback((token: string) => {
    const payload = decodeAdminAccessToken(token);
    if (!payload) {
      setIsAuthenticated(false);
      setUsername("");
      return false;
    }

    setUsername(payload.username);
    setIsAuthenticated(true);
    return true;
  }, []);

  const clearSession = useCallback(() => {
    setUsername("");
    setIsAuthenticated(false);
  }, []);

  const logout = async () => {
    await authService.logout().catch(() => undefined);

    clearLocalAuthSession();
    clearSession();
    setIsAuthChecked(true);
    navigate("/");
  };

  const login = async (values: z.infer<typeof loginFormSchema>) => {
    setIsLoadingLogin(true);
    try {
      const response = await authService.login(values);

      setAccessToken(response.accessToken);
      localStorage.setItem("refreshToken", response.refreshToken);

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

  useEffect(() => {
    setSessionExpiredListener(() => {
      clearSession();
      navigate("/unauthorized");
    });

    return () => setSessionExpiredListener(null);
  }, [clearSession, navigate]);

  useEffect(() => {
    if (location.pathname === "/") {
      setIsAuthChecked(true);
      return;
    }

    let cancelled = false;

    const initSession = async () => {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        if (!cancelled) {
          clearSession();
          navigate("/unauthorized");
          setIsAuthChecked(true);
        }
        return;
      }

      const accessToken = await restoreSessionFromRefreshToken();
      if (cancelled) return;

      if (accessToken && applySessionFromAccessToken(accessToken)) {
        setIsAuthChecked(true);
        return;
      }

      clearSession();
      navigate("/unauthorized");
      setIsAuthChecked(true);
    };

    initSession();

    return () => {
      cancelled = true;
    };
  }, [applySessionFromAccessToken, clearSession, location.pathname, navigate]);

  return (
    <AuthContext.Provider
      value={{
        isLoadingLogin,
        isAuthenticated,
        isAuthChecked,
        username,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
