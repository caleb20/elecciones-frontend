// src/components/Felicitaciones.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Felicitaciones = () => {
  const navigate = useNavigate();
  const codigoAlumno = localStorage.getItem("codigoAlumno"); // Obtener el código del localStorage

  useEffect(() => {
    if (!codigoAlumno) {
      navigate("/error"); // Redirigir a la página 404 si no hay codigoAlumno
    }
    localStorage.removeItem("codigoAlumno");
  }, []);

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
