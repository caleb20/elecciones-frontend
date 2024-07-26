import { API_BASE_URL } from '../../config';

export const getPartidos = async () => {
    const response = await fetch(`${API_BASE_URL}/partidos/listar`);
  if (!response.ok) {
    throw new Error('Error fetching partidos');
  }
  return response.json();
};

