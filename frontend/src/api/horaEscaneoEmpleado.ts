import { BACK_URL } from "../env";
const token = sessionStorage.getItem("token");

export const escaneoEmpleado = {
  async getAll() {
    const response = await fetch(`${BACK_URL}/escaneo`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error("No se ha podido hacer la consulta");
    }
    const data = await response.json();
    return data;
  },
  async escanear(empleado_id: number, motivo: string) {
    const response = await fetch(`${BACK_URL}/escaneo`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`,
    "Content-Type": "application/json" },
    body: JSON.stringify({empleado_id, motivo})
    });
    if (!response.ok) {
      throw new Error("No se ha podido hacer el registro");
    }
    const data = await response.json();
    return data;
  },
};
