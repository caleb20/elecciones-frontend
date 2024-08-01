import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthProvider"; // Asegúrate de importar el contexto

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext); // Usa el contexto para actualizar el token

  useEffect(() => {
    // Elimina el token del localStorage y del estado del contexto cuando se monte el componente
    localStorage.removeItem("token");
    setToken(null);
  }, [setToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login({ email, password });

    if (response.success) {
      const token = response.data.token;
      localStorage.setItem("token", token);
      setToken(token); // Actualiza el contexto con el nuevo token

      const decodedToken = jwtDecode(token);
      const roles = decodedToken.roles.map((role) => role.authority) || [];
      if (roles.includes("ROLE_MAESTRO")) {
        navigate("/mantenimiento");
      } else {
        navigate("/votacion");
      }
    } else {
      setError(response.data?.description || "Verifique el usuario");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-6 text-center">Inicio de Sesión</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Correo</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded required"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded required"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
