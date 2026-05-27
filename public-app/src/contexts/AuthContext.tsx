"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState
} from "react";

import { authService } from "@/services/auth.service";

import { toast } from "@/hooks/useToast";

import { AuthContextType } from "@/types/auth-context.type";
import { loginFormSchema } from "@/types/zod.type";

import { decodePubAccessToken } from "@/lib/auth-token";
import {
  clearLocalAuthSession,
  restoreSessionFromRefreshToken,
  setAccessToken,
  setSessionExpiredListener
} from "@/lib/axios";

import { usePathname, useRouter } from "next/navigation";
import { z } from "zod";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [customerId, setCustomerId] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  const applySessionFromAccessToken = useCallback((token: string) => {
    const payload = decodePubAccessToken(token);
    if (!payload) {
      setIsAuthenticated(false);
      setCustomerId(null);
      setUsername(null);
      return;
    }

    setCustomerId(payload.id);
    setUsername(payload.username);
    setIsAuthenticated(true);
  }, []);

  const clearSession = useCallback(() => {
    setCustomerId(null);
    setUsername(null);
    setIsAuthenticated(false);
  }, []);

  const login = async (values: z.infer<typeof loginFormSchema>) => {
    setIsLoadingLogin(true);

    try {
      const response = await authService.login(values);

      setAccessToken(response.pubAccessToken);
      localStorage.setItem("refreshToken", response.pubRefreshToken);

      setCustomerId(response.id);
      setUsername(response.username);
      setIsAuthenticated(true);

      toast({
        title: "All set!",
        description: "Login successful"
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";

      toast({
        variant: "destructive",
        title: "Login failed",
        description: message
      });
    } finally {
      setIsLoadingLogin(false);
    }
  };

  const logout = async () => {
    await authService.logout().catch(() => undefined);

    clearLocalAuthSession();
    clearSession();
    setIsAuthChecked(true);

    router.push("/");
  };

  useEffect(() => {
    setSessionExpiredListener(() => {
      clearSession();

      const publicRoutes = ["/", "/login"];
      if (!publicRoutes.includes(pathname)) {
        router.push("/");
      }
    });

    return () => setSessionExpiredListener(null);
  }, [clearSession, pathname, router]);

  useEffect(() => {
    let cancelled = false;

    const initSession = async () => {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        if (!cancelled) {
          clearSession();
          setIsAuthChecked(true);
        }
        return;
      }

      const accessToken = await restoreSessionFromRefreshToken();
      if (cancelled) return;

      if (accessToken) {
        applySessionFromAccessToken(accessToken);
      } else {
        clearSession();
      }

      setIsAuthChecked(true);
    };

    initSession();

    return () => {
      cancelled = true;
    };
  }, [applySessionFromAccessToken, clearSession]);

  return (
    <AuthContext.Provider
      value={{
        isLoadingLogin,
        isAuthenticated,
        isAuthChecked,
        customerId,
        username,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
