import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../login/LoginPage";
import UnauthorizedPage from "../unauthorized/UnauthorizedPage";
import AutoGuardLogin from "../../components/autoGuard/AutoGuardLogin";
import AdminGuard from "../../components/autoGuard/AutoGuard";
import HomePage from "../home/HomePage";
import UserPage from "../user/UserPage";
import UserDetailsPage from "../userDetails/UserDetailsPage";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AutoGuardLogin children={<LoginPage />} />,
    },
    {
      path: "/home",
      element: <AdminGuard children={<HomePage />} />,
    },
    {
      path: "/users",
      element: <AdminGuard children={<UserPage />} />,
    },
    {
      path: "/users/:userId",
      element: <AdminGuard children={<UserDetailsPage />} />,
    },
    {
      path: "/unauthorized",
      element: <UnauthorizedPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
