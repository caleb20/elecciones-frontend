import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import {jwtDecode} from "jwt-decode";

const ProtectedRoute = ({ children, requiredRoles }) => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/" />;
  }

  const decodedToken = jwtDecode(token);
  const userRoles = decodedToken.roles.map((role) => role.authority) || [];

  if (requiredRoles && !requiredRoles.some((role) => userRoles.includes(role))) {
    return <Navigate to="/error" />;
  }

  return children;
};

export default ProtectedRoute;
