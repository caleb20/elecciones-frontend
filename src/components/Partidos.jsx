import React, { useState, useEffect } from "react";
import { getPartidos } from "../services/partidoService";
import { guardarSeleccion } from "../services/votoService";
import { logout } from "../services/logout"; // Importa el servicio de logout
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Partidos = () => {
  const [partidos, setPartidos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token"); // Obtener el token del localStorage
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/error"); // Redirigir a la página 404 si no hay token
    } else {
      const fetchPartidos = async () => {
        const response = await getPartidos();

        if (response.success) {
          setPartidos(response.data); // `response.data` es el array de partidos
        } else {
          setError(response.message || "No se pudieron cargar los partidos");
        }
      };

      fetchPartidos();
    }
  }, [token, navigate]);

  const handleGuardar = async () => {
    if (seleccionado === null) {
      alert("Por favor, seleccione un partido");
      return;
    }

    try {
      // Extraer el códigoAlumno del token
      const tokenPayload = jwtDecode(token);
      const codigoAlumno = tokenPayload.codigoAlumno;

      const result = await guardarSeleccion(codigoAlumno, seleccionado);

      if (result.success) {
        // Si el voto se guarda correctamente, hacer logout
        navigate("/felicitaciones");
      } else {
        console.error("Error saving selection:", result.message);
      }
    } catch (error) {
      console.error("Error saving selection:", error);
    }
  };

  const handleChange = (codigo) => {
    setSeleccionado(codigo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl mb-6 text-center text-blue-500 font-semibold">
          Lista de Partidos
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
      </div>
    </div>
  );
};

export default Partidos;
