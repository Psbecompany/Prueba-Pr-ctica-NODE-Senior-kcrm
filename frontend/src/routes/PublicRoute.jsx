import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading/Loading";

function PublicRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { state } = location;

  const { from } = state || { from: { pathname: "/" } };

  if (loading) return <Loading />;

  if (user) {
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
