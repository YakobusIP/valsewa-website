"use client";

import { Button } from "@/components/ui/button";

import { useAuth } from "@/hooks/useAuth";

import { useRouter } from "next/navigation";

export function AuthButton() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    return <Button onClick={() => router.push("/")}>Login</Button>;
  }

  return (
    <Button variant="destructive" onClick={logout}>
      Logout
    </Button>
  );
}
