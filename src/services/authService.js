import axios from "axios";
import { API_BASE_URL } from "../../config";

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, {
      correo: email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { success: false, message: "Ocurrió un error desconocido" };
    }
  }
};

// Servicio para refrescar el token
export const refreshToken = async (token) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/refresh-token`,
      { token },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Error desconocido');
  }
};

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
