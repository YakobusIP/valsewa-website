import { ReactNode } from "react";

import { useAuth } from "@/hooks/useAuth";

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
