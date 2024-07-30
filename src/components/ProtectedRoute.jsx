// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider"; // Importa correctamente el contexto
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, requiredRoles }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/" />;
  }

  // Decodifica el token para obtener los roles
  const decodedToken = jwtDecode(token);
  const userRoles = decodedToken.roles.map((role) => role.authority) || [];

  // Verifica si el usuario tiene el rol requerido
  if (
    requiredRoles &&
    !requiredRoles.some((role) => userRoles.includes(role))
  ) {
    return <Navigate to="/error" />;
  }

  return children;
};

export default ProtectedRoute;
