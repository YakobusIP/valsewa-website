import { Toaster } from "@/components/ui/toaster";

import { AuthProvider } from "@/contexts/AuthContext";
import { PriceTierProvider } from "@/contexts/PriceTierContext";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <PriceTierProvider>
        <Outlet />
        <Toaster />
      </PriceTierProvider>
    </AuthProvider>
  );
}
