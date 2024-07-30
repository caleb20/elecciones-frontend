// src/components/Felicitaciones.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService"; // Importa el servicio de logout

const Felicitaciones = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Obtener el token del localStorage

  useEffect(() => {
    const performLogout = async () => {
      if (token) {
        await logout();
      } else {
        navigate("/error"); // Redirigir a la página 404 si no hay token
      }
    };

    performLogout();
  }, [navigate, token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h2 className="text-3xl mb-6 text-blue-500 font-semibold">
          ¡Felicitaciones!
        </h2>
        <p className="text-lg text-gray-700">Gracias por participar</p>
      </div>
    </div>
  );
};

export default Felicitaciones;
