import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, Button } from "flowbite-react";

interface Props {
  horaEscaneoEmpleado: (
    empleado_id: number,
    motivo: "entrada" | "salida"
  ) => Promise<void>;
}

export function LectorQR({ horaEscaneoEmpleado }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [empleado, setEmpleado] = useState<{
    id: number;
    nombre: string;
    apellido: string;
  } | null>(null);

  useEffect(() => {
    if (!openModal) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { qrbox: { width: 250, height: 250 }, fps: 5 },
        false
      );

      scanner.render(onScanSuccess, onScanError);

      function onScanSuccess(decodedText: string) {
        try {
          const parsed = JSON.parse(decodedText);

          if (!parsed.id || !parsed.nombre || !parsed.apellido) {
            console.warn("QR inválido");
            return;
          }

          setEmpleado(parsed);
          setOpenModal(true);
          scanner.clear();
        } catch {
          console.warn("El QR no contiene JSON válido");
        }
      }

      function onScanError(err: unknown) {}

      return () => {
        scanner.clear().catch(() => {});
      };
    }
  }, [openModal]);

  const registrar = async (motivo: "entrada" | "salida") => {
    if (!empleado) return;
    await horaEscaneoEmpleado(empleado.id, motivo);
    setOpenModal(false);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center space-y-4">
      <div id="reader" className="w-full max-w-xs"></div>

      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <ModalHeader>Confirmar registro</ModalHeader>
        <ModalBody>
          {empleado && (
            <div className="space-y-4 text-center">
              <p className="text-lg font-semibold">
                {empleado.nombre} {empleado.apellido}
              </p>
              <p className="text-gray-600">ID: {empleado.id}</p>

              <div className="flex justify-center space-x-4 mt-4">
                <Button onClick={() => registrar("entrada")}>
                  Registrar entrada
                </Button>

                <Button onClick={() => registrar("salida")}>
                  Registrar salida
                </Button>
              </div>
            </div>
          )}
        </ModalBody>
      </Modal>
    </div>
  );
}
