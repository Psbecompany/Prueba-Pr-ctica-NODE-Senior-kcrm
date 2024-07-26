import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Layout from "../layout/Layout";
import Loading from "../components/Loading/Loading";

function ProtectedRoute({ allowedRoles = [] }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const { pathname } = location;

  if (loading) return <Loading />;

  if (!user) {
    return <Navigate to="/auth" replace state={{ from: pathname }} />;
  }

  // Verificar si el usuario tiene al menos uno de los roles permitidos
  const hasAccess = allowedRoles.some((role) => user.roles.includes(role));

  if (!hasAccess) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default ProtectedRoute;
