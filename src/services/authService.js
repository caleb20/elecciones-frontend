import axios from 'axios';
import { API_BASE_URL } from '../../config';

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { correo: email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { success: false, message: "Ocurrió un error desconocido" };
    }
  }
};
