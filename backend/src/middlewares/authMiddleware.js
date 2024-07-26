export const isAuthenticated = (req, res, next) => {
  const { user } = req.session;

  if (!user) {
    return res.status(401).json({ message: "No estás autenticado" });
  }

  next();
};

export const isAdmin = (req, res, next) => {
  const user = req.session.user;

  if (!user || !user.roles || !user.roles.includes("administrador")) {
    return res
      .status(403)
      .json({ message: "No tienes permisos para realizar esta acción" });
  }

  next();
};
