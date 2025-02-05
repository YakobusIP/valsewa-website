import { StrictMode } from "react";

import { Toaster } from "@/components/ui/toaster.tsx";

import { PriceTierProvider } from "@/contexts/PriceTierContext";
import "@/index.css";
import { router } from "@/routes/routes.tsx";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PriceTierProvider>
      <RouterProvider router={router} />
      <Toaster />
    </PriceTierProvider>
  </StrictMode>
);
