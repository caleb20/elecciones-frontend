import { API_BASE_URL } from '../../config';

export const login = async ({ email, password }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return data; // Asegúrate de que `data` contiene `codigo` y `email`
    } else {
      console.error("Login failed:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error during login:", error);
    return null;
  }
};
