import { useState, useEffect, useMemo } from "react";
import { escaneoEmpleado } from "../api/horaEscaneoEmpleado";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
  Label,
} from "flowbite-react";
import { PageHeader } from "../components/pageHeader";
import SkeletonLoader from "../components/skeletonLoader";

interface horas {
  fechaHora: Date | string;
  motivo: string;
  Empleado: {
    nombre: string;
    apellido: string;
    cedula: number;
  };
}

export function EntradaSalidadEmpleadosPage() {
  const [horasList, setHorasList] = useState<horas[]>([]);
  const [search, setSearch] = useState("");
  const [fecha, setFecha] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const horas = await escaneoEmpleado.getAll();
        setHorasList(horas);
        setLoading(false)
      } catch (error) {
        console.error("Error al cargar horas:", error);
      }
    };

    fetchData();
  }, []);

  /* ===========================
     FILTRADO INTELIGENTE
     =========================== */
  const filteredHoras = useMemo(() => {
    return horasList.filter((hora) => {
      const fullName = `${hora.Empleado.nombre} ${hora.Empleado.apellido}`.toLowerCase();
      const cedula = hora.Empleado.cedula.toString();
      const motivo = hora.motivo.toLowerCase();

      const searchLower = search.toLowerCase();

      const matchSearch =
        fullName.includes(searchLower) ||
        cedula.includes(searchLower) ||
        motivo.includes(searchLower);

      const matchFecha = fecha
        ? new Date(hora.fechaHora).toISOString().split("T")[0] === fecha
        : true;

      return matchSearch && matchFecha;
    });
  }, [horasList, search, fecha]);

  if(loading) return <SkeletonLoader />

  return (
    <div className="flex flex-col space-y-6 w-full h-full p-4 min-h-0">
      {/* Header */}
      <PageHeader
        title="Entrada y Salida de Empleados"
        subtitle="Control de acceso del personal a la planta"
      />

      {/* Filtros */}
      <div
        className="
          relative
          rounded-2xl p-4
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          shadow-xl
          flex flex-col md:flex-row gap-4
        "
      >
        {/* Highlight líquido */}
        <div className="absolute inset-0 bg-linear-to-br rounded-2xl from-white/20 via-transparent to-transparent pointer-events-none" />

        <div className="flex flex-col gap-1 w-full md:w-1/2 relative z-10">
          <Label className="text-white/80 font-medium">
            Buscar por nombre, apellido o cédula
          </Label>
          <TextInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ej: Miguel, Martinez, 20565874..."
            className="
              bg-white/10 border-white/20 text-white
              focus:border-yellow-400 focus:ring-yellow-400
            "
          />
        </div>

        <div className="flex flex-col gap-1 w-full md:w-1/4 relative z-10">
          <Label className="text-white/80 font-medium">
            Filtrar por fecha
          </Label>
          <TextInput
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            className="
              bg-white/10 border-white/20 text-white
              focus:border-yellow-400 focus:ring-yellow-400
            "
          />
        </div>
      </div>

      {/* Tabla */}
      <div
        className="
          relative flex-1 min-h-0
          rounded-2xl p-4
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          shadow-2xl
          overflow-hidden
        "
      >
        {/* Highlight líquido */}
        <div className="absolute inset-0 bg-linear-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 h-full overflow-auto">
          <Table hoverable>
            <TableHead className="sticky top-0 bg-black/60 backdrop-blur-md z-10">
              <TableRow>
                <TableHeadCell className="">Empleado</TableHeadCell>
                <TableHeadCell className="">Cédula</TableHeadCell>
                <TableHeadCell className="">Fecha y Hora</TableHeadCell>
                <TableHeadCell className="">Motivo</TableHeadCell>
              </TableRow>
            </TableHead>

            <TableBody className="">
              {filteredHoras.map((hora, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-white/5 transition-colors"
                >
                  <TableCell className="whitespace-nowrap ">
                    {hora.Empleado.nombre} {hora.Empleado.apellido}
                  </TableCell>

                  <TableCell className="">
                    {hora.Empleado.cedula}
                  </TableCell>

                  <TableCell className="">
                    {new Date(hora.fechaHora).toLocaleString("es-VE", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </TableCell>

                  <TableCell>
                    <span
                      className={`
                        px-3 py-1 rounded-full text-sm font-medium
                        ${
                          hora.motivo === "entrada"
                            ? "bg-green-400/20 text-green-300"
                            : "bg-red-400/20 text-red-300"
                        }
                      `}
                    >
                      {hora.motivo}
                    </span>
                  </TableCell>
                </TableRow>
              ))}

              {filteredHoras.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-white/60 py-8">
                    No se encontraron registros
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
