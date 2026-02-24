import { BACK_URL } from "../env";


export default class RecuperarContraseña {
  static async recuperarContraseña(email: string) {
    try {
      const res = await fetch(`${BACK_URL}/login/recuperarContrasena`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email})
      });
       const data = await res.json();
      if (!res.ok) {
        throw new Error(data);
      }
      return data
    } catch (error) {
      throw error;
    }
  }
  static async validarCodigo(email: string, codigo: string, password: string){
    try{
      const res = await fetch(`${BACK_URL}/login/validarCodigo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email, codigo, password})
      });
       const data = await res.json();
      if (!res.ok) {
        throw new Error(data);
      }
      return data
    }catch(error){
      throw error
    }
  }
}
