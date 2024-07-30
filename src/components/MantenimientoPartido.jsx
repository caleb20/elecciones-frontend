import React from "react";

const MantenimientoPartido = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl mb-6 text-center text-blue-500 font-semibold">
          Mantenimiento de Partido
        </h2>
        <p className="text-lg text-gray-700">
          Esta pantalla solo es accesible para el rol ROLE_MAESTRO.
        </p>
      </div>
    </div>
  );
};

export default MantenimientoPartido;
