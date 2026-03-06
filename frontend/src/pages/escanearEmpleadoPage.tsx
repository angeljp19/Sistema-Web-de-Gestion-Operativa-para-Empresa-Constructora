import { LectorQR } from "../components/lectorQr";
import { escaneoEmpleado } from "../api/horaEscaneoEmpleado";

export function EscaneoEmpleadoPage() {
  return (
    <div className="flex justify-center items-center">
      <LectorQR horaEscaneoEmpleado={escaneoEmpleado.escanear} />
    </div>
  );
}
