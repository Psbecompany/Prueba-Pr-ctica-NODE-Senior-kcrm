import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import PublicRoute from "./PublicRoute.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Loading from "../components/Loading/Loading.jsx";

const AdminDashboard = lazy(() => import("../pages/AdminDashboard"));
const Employee = lazy(() => import("../pages/Employee/Employee"));
const Solicitude = lazy(() => import("../pages/Solicitude/Solicitude"));
const NotFound = lazy(() => import("../pages/NotFound"));
const Auth = lazy(() => import("../pages/Auth/Auth.jsx"));
const Unauthorized = lazy(() => import("../pages/Unauthorized"));

const AppRoutes = () => {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Ruta protegida para AdminDashboard y Employee */}
            <Route
              element={
                <ProtectedRoute allowedRoles={["administrador", "empleado"]} />
              }
            >
              <Route path="/" element={<AdminDashboard />} />
              <Route path="/employee" element={<Employee />} />
            </Route>
            {/* Ruta protegida solo para administradores */}
            <Route
              element={<ProtectedRoute allowedRoles={["administrador"]} />}
            >
              <Route path="/solicitudes" element={<Solicitude />} />
            </Route>
            {/* Ruta pública */}
            <Route element={<PublicRoute />}>
              <Route path="/auth" element={<Auth />} />
            </Route>

            {/* Ruta de no encontrado */}
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
};

export default AppRoutes;
