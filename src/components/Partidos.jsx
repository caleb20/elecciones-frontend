import React, { useState, useEffect } from "react";
import { getPartidos } from "../services/partidoService";
import { guardarSeleccion } from "../services/votoService";
import { refreshToken } from "../services/authService"; // Asegúrate de importar aquí
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Partidos = () => {
  const [partidos, setPartidos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/error");
      return;
    }

    const fetchPartidos = async () => {
      const response = await getPartidos();
      if (response.success) {
        setPartidos(response.data);
      } else {
        console.error("Error al obtener los partidos:", response.message);
      }
    };

    fetchPartidos();

    try {
      const { exp } = jwtDecode(token);
      const expirationTime = exp * 1000; // Convertir a milisegundos
      const warningTime = expirationTime - Date.now() - 10000; // 10 segundos antes de la expiración

      if (warningTime > 0) {
        const timer = setTimeout(() => {
          setShowWarning(true);
        }, warningTime);

        return () => clearTimeout(timer);
      } else {
        navigate("/error");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/error");
    }
  }, [token, navigate]);

  const handleRefreshToken = async () => {
    try {
      const response = await refreshToken(token);
      const newToken = response.data.token;
      localStorage.setItem("token", newToken);
      setShowWarning(false);
    } catch (error) {
      console.error("Error al refrescar el token:", error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handleGuardar = async () => {
    if (seleccionado === null) {
      alert("Por favor, seleccione un partido");
      return;
    }

    try {
      const tokenPayload = jwtDecode(token);
      const codigoAlumno = tokenPayload.codigoAlumno;

      const response = await guardarSeleccion(codigoAlumno, seleccionado);
      if (response.success) {
        navigate("/felicitaciones");
      } else {
        console.error("Error al guardar la selección:", response.message);
      }
    } catch (error) {
      console.error("Error al guardar la selección:", error);
    }
  };

  const handleChange = (codigo) => {
    setSeleccionado(codigo);
  };

  const handleWarningResponse = (response) => {
    if (response === "yes") {
      console.log("Entra aca");
      handleRefreshToken();
    } else {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl mb-6 text-center text-blue-500 font-semibold">
          Lista de Partidos
        </h2>
        <ul className="list-none">
          {partidos.map((partido) => (
            <li key={partido.codigo} className="mb-4">
              <label className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  {partido.simbolo && (
                    <img
                      src={`data:image/png;base64,${partido.simbolo}`}
                      alt={`${partido.nombrePartido} símbolo`}
                      className="h-8 w-8 mr-4"
                    />
                  )}
                  <span className="text-lg text-gray-700">
                    {partido.nombrePartido}
                  </span>
                </div>
                <input
                  type="radio"
                  name="partido"
                  value={partido.codigo}
                  checked={seleccionado === partido.codigo}
                  onChange={() => handleChange(partido.codigo)}
                  className="form-radio h-5 w-5 text-blue-600"
                />
              </label>
            </li>
          ))}
        </ul>
        <button
          onClick={handleGuardar}
          className="mt-6 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
        >
          Guardar
        </button>

        {showWarning && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl mb-4">Advertencia</h3>
              <p className="mb-4">
                El token está a punto de expirar. ¿Desea continuar?
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => handleWarningResponse("yes")}
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                >
                  Sí
                </button>
                <button
                  onClick={() => handleWarningResponse("no")}
                  className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Partidos;
