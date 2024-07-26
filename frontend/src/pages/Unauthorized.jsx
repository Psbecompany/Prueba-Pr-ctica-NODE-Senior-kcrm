import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-6 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold text-red-600">Acceso Denegado</h1>
        <p className="mt-4 text-gray-700">
          No tienes permisos para acceder a esta página.
        </p>
        <Link to="/" className="mt-4 text-blue-500 hover:underline">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
