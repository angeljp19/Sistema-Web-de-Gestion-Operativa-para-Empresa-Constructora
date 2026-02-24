import { BACK_URL } from "../env";

const token = sessionStorage.getItem("token");

export const empleados = {
  async getAll() {
    const response = await fetch(`${BACK_URL}/empleados`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error("No se ha podido hacer la consulta");
    }
    const data = await response.json();
    return data;
  },
  async create(
    nombre: string,
    apellido: string,
    cedula: number,
    planta_id: number
  ) {
    const response = await fetch(`${BACK_URL}/empleados`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        apellido,
        cedula,
        planta_id,
      }),
    });
    if (!response.ok) {
      throw new Error("Ha ocurrido un error");
    }
    const data = await response.json();
    return data;
  },
  async update(
    id: number,
    nombre?: string,
    apellido?: string,
    cedula?: number,
    planta_id?: number,
    activo?: boolean
  ) {
    const response = await fetch(`${BACK_URL}/empleados/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        apellido,
        cedula,
        planta_id,
        activo
      }),
    });
    if (!response.ok) {
      throw new Error("Ha ocurrido un error");
    }
    const data = await response.json();
    return data;
  },
};
