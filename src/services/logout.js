import axios from 'axios';
import { API_BASE_URL } from '../../config';

export const logout = async () => {
  try {
    const token = localStorage.getItem('token'); // Obtener el token del localStorage
    await axios.post(
      `${API_BASE_URL}/auth/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Agregar el token en el header Authorization
        },
      }
    );

    // Eliminar el token del localStorage después de hacer logout
    localStorage.removeItem('token');
    return { success: true };
  } catch (error) {
    return { success: false, message: error.message || 'Ocurrió un error desconocido' };
  }
};
