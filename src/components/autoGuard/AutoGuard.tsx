import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { Box } from "@mui/material";
import Navbar from "../layout/Navbar";
import Header from "../layout/Header";

interface AdminGuardProps {
  children: JSX.Element | JSX.Element[];
}

const REQUIRED_ROLE = "ROLE_ADMIN";

/**
 * AdminGuard component restricts access to its children based on user authentication and role.
 * - If user is not authenticated, redirects to login page ("/").
 * - If user is authenticated but not an admin, redirects to unauthorized page ("/unauthorized").
 * - Otherwise, renders the children wrapped with Navbar and Header.
 *
 * @param children - JSX elements to render if access is granted
 */
const AdminGuard = ({ children }: AdminGuardProps) => {
  const { auth } = useSelector((state: RootState) => state.auth);

  if (!auth || !auth.token) {
    return <Navigate to="/" replace />;
  }

  if (auth.role !== REQUIRED_ROLE) {
    return <Navigate to="/unauthorized" replace />; // redirige a unauthorizedPage (router)
  }

  return (
    <Box sx={mainGuardLayoutStyle}>
      <Navbar />
      <Header />
      <Box sx={contentWrapperStyle}>{children}</Box>
    </Box>
  );
};

const mainGuardLayoutStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  width: "100%",
  overflow: "hidden",
};

const contentWrapperStyle = {
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  width: "100%",
};

export default AdminGuard;
