import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Navigate } from "react-router-dom";

interface AutoGuardProp {
  children: JSX.Element | JSX.Element[];
}
/**
 * AutoGuardLogin component automatically redirects authenticated users to the home page.
 * - If user is not authenticated (no token), renders the children (typically the login page).
 * - If user is authenticated, redirects to "/home".
 *
 * @param children - JSX elements to render if user is not authenticated
 */
const AutoGuardLogin = ({ children }: AutoGuardProp) => {
  const { auth, loading } = useSelector((state: RootState) => state.auth);

  if (loading) {
    return null;
  }

  return auth.token == null ? (
    <>{children}</>
  ) : (
    <Navigate to={"/home"} replace />
  );
};

export default AutoGuardLogin;
