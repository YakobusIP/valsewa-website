import { ReactNode, useEffect, useState } from "react";

import { useNavigate } from "react-router";

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate("/unauthorized");
    }
  }, [navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
