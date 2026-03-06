import { useState, useEffect } from "react";
import { escaneoEmpleado } from "../api/horaEscaneoEmpleado";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";

import SkeletonLoader from "../components/skeletonLoader";
import { formatDMY } from "../utils/utils";

interface horas {
  fechaHora: Date | string;
  motivo: string;
  Empleado: {
    nombre: string;
    apellido: string;
    cedula: number;
  };
}

export function TableEntradaSalida() {
  const [horasList, setHorasList] = useState<horas[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const horas = await escaneoEmpleado.getAll();
        setHorasList(horas);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar horas:", error);
      }
    };

    fetchData();
  }, []);

  if (loading) return <SkeletonLoader />;

  return (
    <div className="flex flex-col p-2 gap-4 ">
      <span className="text-lg">Ultimas entradas y salidas</span>
      <div className="overflow-auto">
        <Table hoverable>
          <TableHead className="sticky top-0 bg-black/60 backdrop-blur-md z-10">
            <TableRow>
              <TableHeadCell className="">Empleado</TableHeadCell>
              <TableHeadCell className="">Fecha</TableHeadCell>
              <TableHeadCell className="">Motivo</TableHeadCell>
            </TableRow>
          </TableHead>

          <TableBody className="">
            {horasList.slice(0, 3).map((hora, index) => (
              <TableRow
                key={index}
                className="hover:bg-white/5 transition-colors"
              >
                <TableCell className="whitespace-nowrap ">
                  {hora.Empleado.nombre} {hora.Empleado.apellido}
                </TableCell>

                <TableCell className="">
                  {formatDMY(hora.fechaHora as string)}
                </TableCell>

                <TableCell>
                  <span
                    className={`
                        px-3 py-1 rounded-full text-sm font-medium
                        ${
                          hora.motivo === "entrada"
                            ? "bg-green-400/20 text-green-500"
                            : "bg-red-400/20 text-red-500"
                        }
                      `}
                  >
                    {hora.motivo}
                  </span>
                </TableCell>
              </TableRow>
            ))}

            {horasList.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-white/60 py-8"
                >
                  No se encontraron registros
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
