import { ReactNode } from "react";

import { useAuth } from "@/hooks/useAuth";

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, isAuthChecked } = useAuth();

  if (!isAuthChecked) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
