import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Navigate } from "react-router-dom";

interface AutoGuardProp {
  children: JSX.Element | JSX.Element[];
}

const AutoGuardLogin = ({ children }: AutoGuardProp) => {
  const { auth } = useSelector((state: RootState) => state.auth);
  return auth.token == null ? (
    <>{children}</>
  ) : (
    <Navigate to={"/home"} replace /> // home = KPI
  );
};

export default AutoGuardLogin;
