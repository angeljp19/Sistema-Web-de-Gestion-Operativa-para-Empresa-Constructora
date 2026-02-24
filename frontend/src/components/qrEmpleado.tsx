import { useRef, useState } from "react";
import { Modal, ModalHeader, ModalBody, Button } from "flowbite-react";
import { QRCodeCanvas } from "qrcode.react";
import { HiQrCode } from "react-icons/hi2";
import jsPDF from "jspdf";

interface Props {
  nombre: string;
  apellido: string;
  cedula: number;
  id: number;
}

export function QREmpleado({ nombre, cedula, apellido, id }: Props) {
  const [open, setOpen] = useState(false);
  const qrRef = useRef<HTMLCanvasElement | null>(null);

  const deshabilitar = !nombre || !apellido || !id || !cedula;

  const handleDownloadPDF = () => {
    if (deshabilitar || !qrRef.current) return;

    const canvas = qrRef.current;
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.text(`Empleado: ${nombre} ${apellido}`, 10, 10);
    pdf.text(`Cédula: ${cedula}`, 10, 20);
    pdf.text(`id: ${id}`, 10, 30);
    pdf.addImage(imgData, "PNG", 10, 40, 80, 80);
    pdf.save(`${nombre}-QR.pdf`);
  };

  return (
    <>
      <Button
        color="alternative"
        disabled={deshabilitar}
        onClick={() => !deshabilitar && setOpen(true)}
      >
        <HiQrCode className="me-2 h-4 w-4" /> QR
      </Button>

      <Modal show={open} onClose={() => setOpen(false)}>
        <ModalHeader>QR del empleado</ModalHeader>
        <ModalBody>
          <div className="flex flex-col items-center space-y-4">
            <QRCodeCanvas
              ref={qrRef}
              value={JSON.stringify({
                id,
                nombre,
                apellido,
                cedula,
              })}
              size={180}
              level="H"
              includeMargin
            />
            <Button onClick={handleDownloadPDF}>Descargar PDF</Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
