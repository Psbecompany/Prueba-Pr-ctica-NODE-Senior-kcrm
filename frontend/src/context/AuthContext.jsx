// src/context/AuthContext.js
import { createContext, useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const checkAuth = async () => {
    try {
      await wait(3000);

      const response = await fetch("http://localhost:3000/auth/check", {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error en checkAuth:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (userData) => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
        setLoading(false);
      } else {
        console.error("Error en login:", data.message);
        setLoading(false);
      }

      return data;
    } catch (error) {
      console.error("Error en login:", error);
      setLoading(false);
      return { message: "Error al conectar con el servidor" };
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data);
      } else {
        console.error("Error en register:", data.message);
      }
      return data;
    } catch (error) {
      console.error("Error en register:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => setUser(null);

  useEffect(() => {
    checkAuth(); // Verifica la autenticación al cargar la aplicación
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({ user, login, logout, register, loading }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
