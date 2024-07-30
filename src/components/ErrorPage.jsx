import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage  = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl mb-4">404 - Página no encontrada</h1>
        <p className="mb-4">La página que estás buscando no existe.</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage ;
