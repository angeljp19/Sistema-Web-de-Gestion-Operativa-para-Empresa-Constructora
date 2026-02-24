import { LectorQR } from "../components/lectorQr";
import { escaneoEmpleado } from "../api/horaEscaneoEmpleado";

export function EscaneoEmpleadoPage(){ 
    return(
      <LectorQR horaEscaneoEmpleado={escaneoEmpleado.escanear} />
    )
}