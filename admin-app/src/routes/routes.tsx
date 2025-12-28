import CreateUserPage from "@/components/dashboard/CreateUserModal";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import NotFoundPage from "@/routes/NotFoundPage";
import ProtectedRoute from "@/routes/ProtectedRoute";
import RootLayout from "@/routes/RootLayout";
import UnauthorizedPage from "@/routes/UnauthorizedPage";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Login />
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        )
      },
      {
        path: "register", // ✅ ADD THIS ROUTE
        element: (
          <ProtectedRoute>
            <CreateUserPage open={false} onOpenChange={function (open: boolean): void {
              throw new Error("Function not implemented.");
            } } />
          </ProtectedRoute>
        )
      },
      {
        path: "unauthorized",
        element: <UnauthorizedPage />
      },
      {
        path: "404",
        element: <NotFoundPage />
      }
    ]
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);
