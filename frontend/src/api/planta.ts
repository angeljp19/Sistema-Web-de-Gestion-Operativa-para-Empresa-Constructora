const BACK_URL = import.meta.env.VITE_BACK_URL;
const token = sessionStorage.getItem("token");

export const planta = {
  async getAll() {
    const response = await fetch(`${BACK_URL}/plantas`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error("No se ha podido hacer la consulta");
    }
    const data = await response.json();
    return data;
  },
};
