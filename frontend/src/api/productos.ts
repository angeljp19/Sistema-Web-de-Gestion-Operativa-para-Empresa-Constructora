import { BACK_URL } from "../env";
const token = sessionStorage.getItem("token");

export const Productos = {
  async getAll() {
    const response = await fetch(`${BACK_URL}/productos`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) {
      throw new Error("No se ha podido hacer la consulta");
    }
    const data = await response.json();
    return data;
  },
  async create(nombre: string) {
    console.log(nombre)
    const response = await fetch(`${BACK_URL}/productos`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`,
    "Content-Type": "application/json" },
      body: JSON.stringify({ nombre }),
    });
    if (!response.ok) {
      throw new Error("No se ha podido agregar el producto");
    }
    const data = await response.json();
    return data;
  },
  async update(id: number, nombre: string) {
    const response = await fetch(`${BACK_URL}/productos/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}`,
     "Content-Type": "application/json" },
      body: JSON.stringify({ nombre }),
    });
    if (!response.ok) {
      throw new Error("No se ha podido actualizar el producto");
    }
    const data = await response.json();
    return data;
  },
  async delete(id: number) {
    const response = await fetch(`${BACK_URL}/productos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!response.ok) {
      throw new Error("No se ha podido eliminar el producto");
    }
    const data = await response.json();
    return data;
  },
};
