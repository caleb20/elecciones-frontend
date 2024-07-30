import axios from "axios";
import { API_BASE_URL } from "../../config";

export const getPartidos = async () => {
  try {
    const token = localStorage.getItem("token"); // Obtener el token del localStorage
    const response = await axios.get(
      `${API_BASE_URL}/partidos/listar`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Agregar el token en el header Authorization
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      return error.response.data;
    } else {
      return { success: false, message: "Ocurrió un error desconocido" };
    }
  }
};
