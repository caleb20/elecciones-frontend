import React, { useState, useEffect } from "react";
import { getPartidos } from "../services/partidoService";
import { guardarSeleccion } from "../services/votoService";
import { useNavigate } from "react-router-dom";

const Partidos = () => {
  const [partidos, setPartidos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const codigoAlumno = localStorage.getItem("codigoAlumno"); // Obtener el código del localStorage
  const navigate = useNavigate();

  useEffect(() => {
    if (!codigoAlumno) {
      navigate("/error"); // Redirigir a la página 404 si no hay codigoAlumno
    } else {
      const fetchPartidos = async () => {
        try {
          const data = await getPartidos();
          setPartidos(data);
        } catch (error) {
          console.error("Error fetching partidos:", error);
        }
      };

      fetchPartidos();
    }
  }, [codigoAlumno, navigate]);

  const handleGuardar = async () => {
    if (seleccionado === null) {
      alert("Por favor, seleccione un partido");
      return;
    }

    try {
      const data = {
        codigoAlumno: codigoAlumno, // Usar el código del localStorage
        codigoPartidoPolitico: seleccionado,
      };

      await guardarSeleccion(data);
/*       localStorage.removeItem("codigoAlumno"); */
      navigate("/felicitaciones");
/*       alert("Selección guardada correctamente");
 */    } catch (error) {
      console.error("Error saving selection:", error);
    }
  };

  const handleChange = (codigo) => {
    setSeleccionado(codigo);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-3xl mb-6 text-center text-blue-500 font-semibold">Lista de Partidos</h2>
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
                  <span className="text-lg text-gray-700">{partido.nombrePartido}</span>
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
