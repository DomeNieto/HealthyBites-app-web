import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "../login/LoginPage";
import UnauthorizedPage from "../unauthorized/UnauthorizedPage";
import AutoGuardLogin from "../../components/autoGuard/AutoGuardLogin";
import AdminGuard from "../../components/autoGuard/AutoGuard";
import HomePage from "../home/HomePage";
import UserPage from "../user/UserPage";
import UserDetailsPage from "../userDetails/UserDetailsPage";
import IngredientPage from "../ingredient/IngredientPage";
import AdvicePage from "../advice/AdvicePage";
import UserRecipesPage from "../userRecipes/UserRecipesPage";

// This component sets up the main route structure for the application using react-router-dom.
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
      path: "/recipes/user/:userId",
      element: <AdminGuard children={<UserRecipesPage />} />,
    },
    {
      path: "/ingredients",
      element: <AdminGuard children={<IngredientPage />} />,
    },
    {
      path: "/advices",
      element: <AdminGuard children={<AdvicePage />} />,
    },
    {
      path: "/unauthorized",
      element: <UnauthorizedPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
