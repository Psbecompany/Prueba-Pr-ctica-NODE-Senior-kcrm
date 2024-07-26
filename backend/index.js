import express from "express";
import cors from "cors"; // Importa cors
import { PORT, SECRET_JWT_KEY } from "./src/config.js";
import userRoutes from "./src/routes/user/user.routes.js";
import empleadoRoutes from "./src/routes/empleado/empleado.routes.js";
import solicitudRoutes from "./src/routes/solicitud/solicitud.routes.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

const app = express();

// Configura CORS para permitir solicitudes desde un dominio específico y habilitar ciertos métodos y credenciales
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json()); // Permite a la aplicación manejar datos en formato JSON

app.use(cookieParser()); // Permite a la aplicación parsear cookies en las solicitudes

// Middleware para manejar la autenticación del usuario basado en el token JWT en las cookies
app.use((req, res, next) => {
  const token = req.cookies.access_token; // Obtiene el token de acceso de las cookies
  req.session = { user: null }; // Inicializa la sesión del usuario como null

  try {
    const data = jwt.verify(token, SECRET_JWT_KEY); // Verifica el token con la clave secreta
    req.session.user = data; // Si el token es válido, guarda los datos del usuario en la sesión
  } catch {}
  next(); // Pasa al siguiente middleware
});

// Configura las rutas para autenticación, empleados y solicitudes
app.use("/auth", userRoutes);
app.use("/empleado", empleadoRoutes);
app.use("/solicitud", solicitudRoutes);

// Inicia el servidor y escucha en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
