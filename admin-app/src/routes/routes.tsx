import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import NotFoundPage from "@/routes/NotFoundPage";
import UnauthorizedPage from "@/routes/UnauthorizedPage";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />
  },
  {
    path: "/404",
    element: <NotFoundPage />
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);
