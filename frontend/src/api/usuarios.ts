const BACK_URL = import.meta.env.VITE_BACK_URL;

const token = sessionStorage.getItem("token");

export const usuariosAPI = {
  async getAll() {
    const response = await fetch(`${BACK_URL}/usuarios`, {
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
    email: string,
    cedula: number,
    password: string
  ) {
    const response = await fetch(`${BACK_URL}/usuarios`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        apellido,
        email,
        cedula,
        password,
      }),
    });

    if (!response.ok) {
      const message = await response.json();
      throw new Error(message.message);
    }

    const data = await response.json();
    return data;
  },

  async update(
    id: number,
    nombre?: string,
    apellido?: string,
    email?: string,
    cedula?: number,
    password?: string,
    activo?: boolean
  ) {
    const response = await fetch(`${BACK_URL}/usuarios/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre,
        apellido,
        email,
        cedula,
        password,
        activo,
      }),
    });

    if (!response.ok) {
      const message = await response.json();
      throw new Error(message.message);
    }

    const data = await response.json();
    return data;
  },

  async delete(id: number) {
    const response = await fetch(`${BACK_URL}/usuarios/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      const message = await response.json();
      throw new Error(message.message);
    }

    return true;
  },
};
