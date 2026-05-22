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

import { setAccessToken } from "@/lib/axios";

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

  // ------------ LOGIN ------------
  const login = async (values: z.infer<typeof loginFormSchema>) => {
    setIsLoadingLogin(true);

    try {
      const response = await authService.login(values);

      // Save tokens
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

  // ------------ LOGOUT ------------
  const logout = async () => {
    try {
      await authService.logout();
    } catch {}

    localStorage.removeItem("refreshToken");
    setAccessToken(null);

    setCustomerId(null);
    setUsername(null);
    setIsAuthenticated(false);
    setIsAuthChecked(false);

    router.push("/");
  };

  // ------------ VALIDATE TOKEN ------------
  const validateToken = useCallback(async () => {
    try {
      const response = await authService.validateToken();

      setUsername(response.username);
      setCustomerId(response.id);
      setIsAuthenticated(true);
    } catch {
      // Not authenticated
      setIsAuthenticated(false);

      const publicRoutes = ["/", "/login"];

      if (!publicRoutes.includes(pathname)) {
        router.push("/");
      }
    } finally {
      setIsAuthChecked(true);
    }
  }, [router, pathname]);

  // ------------ AUTO CHECK ON LOAD ------------
  useEffect(() => {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      setIsAuthChecked(true);
      return;
    }

    // If we have a refresh token, we should ALWAYS validate it to restore session,
    // even on public pages like home or login. This ensures the user sees their logged-in state.

    validateToken();
  }, [pathname, validateToken]);

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
