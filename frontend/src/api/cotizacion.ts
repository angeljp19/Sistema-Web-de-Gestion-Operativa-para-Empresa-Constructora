const BACK_URL = import.meta.env.VITE_BACK_URL;
const token = sessionStorage.getItem("token");

interface Producto {
  item: number;
  unidad: string;
  cantidad: string;
  descripcion: string;
  precio: string;
  total: number;
}

interface form {
  cliente: "";
  rif: "";
  telefono: "";
  direccion: "";
  atencion: "";
  email: "";
  cotizacionNum: "";
  fecha: "";
  validezOferta: "";
  condicionPago: "";
  personaContacto: "";
  numeroDirecto: "";
}

export const Cotizacion = {
  async createMateriales(productos: Producto[], form: form) {
    const response = await fetch(`${BACK_URL}/cotizacion/cotizacionMateriales`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ form: form, productos: productos }),
    });
    if (!response.ok) {
      throw new Error("No se ha podido generar el producto");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "cotizacion.xlsx";
    a.click();

    window.URL.revokeObjectURL(url);
  },
  async createConcreto(productos: Producto[], form: form) {
    const response = await fetch(`${BACK_URL}/cotizacion/cotizacionConcreto`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ form: form, productos: productos }),
    });
    if (!response.ok) {
      throw new Error("No se ha podido generar el producto");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "cotizacionConcreto.xlsx";
    a.click();

    window.URL.revokeObjectURL(url);
  },
  async getQuotes(){
    const response = await fetch(`${BACK_URL}/cotizacion`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("No se han podido obtener las cotizaciones");
    }
    return response.json();
  },
  async getById(id: number){
    const response = await fetch(`${BACK_URL}/cotizacion/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    if (!response.ok) {
      throw new Error("No se ha podido generar el producto");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "cotizacion.xlsx";
    a.click();

    window.URL.revokeObjectURL(url);
  }
};
