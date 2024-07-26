import { API_BASE_URL } from '../../config';

export const guardarSeleccion = async ({ codigoAlumno, codigoPartidoPolitico }) => {
    const response = await fetch(`${API_BASE_URL}/votos/registrar-voto`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        codigoAlumno: codigoAlumno, // Asegúrate de que esté en el formato correcto
        codigoPartidoPolitico: codigoPartidoPolitico
      }),
    });

  if (!response.ok) {
    throw new Error('Error saving selection');
  }

  return response.json();
};