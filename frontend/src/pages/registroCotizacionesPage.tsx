// RegistroCotizacionesPage.tsx
import { useEffect, useMemo, useState } from "react";
import {
  Button,
  Label,
  Table,
  TextInput,
  Spinner,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { PageHeader } from "../components/pageHeader";
import { Cotizacion } from "../api/cotizacion";
import { usePagination } from "../hooks/usePagination";
import { Pagination } from "../components/Pagination";

type Quote = {
  id: number;
  cliente: string;
  cedula_rif: string;
  telefono: string;
  direccion: string;
  atencion: string;
  email: string;
  cotizacion: string;
  fecha: string; // ISO
  validezOferta: string;
  condicionPago: string;
  personaContacto: string;
  numDirecto: string;
};

type LoadState =
  | { status: "idle" | "loading" }
  | { status: "success"; data: Quote[] }
  | { status: "error"; message: string };

function normalize(s: string) {
  return (s ?? "").toString().trim().toLowerCase();
}

function formatDMY(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

// Placeholder: reemplaza con tu endpoint real
async function fetchQuotes(_signal?: AbortSignal): Promise<Quote[]> {
  const cotizaciones = await Cotizacion.getQuotes();

  return cotizaciones;
}

export function RegistroCotizacionesPage() {
  const [state, setState] = useState<LoadState>({ status: "idle" });

  const [qCotizacion, setQCotizacion] = useState("");
  const [qCliente, setQCliente] = useState("");
  const [qRif, setQRif] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  useEffect(() => {
    const ac = new AbortController();
    setState({ status: "loading" });

    fetchQuotes(ac.signal)
      .then((data) => setState({ status: "success", data }))
      .catch((e: unknown) => {
        if (ac.signal.aborted) return;
        const msg = e instanceof Error ? e.message : "Error desconocido";
        setState({ status: "error", message: msg });
      });

    return () => ac.abort();
  }, []);

  const filtered = useMemo(() => {
    if (state.status !== "success") return [];

    const nCot = normalize(qCotizacion);
    const nCli = normalize(qCliente);
    const nRif = normalize(qRif);
    const from = dateFrom ? new Date(`${dateFrom}T00:00:00`) : null;
    const to = dateTo ? new Date(`${dateTo}T23:59:59`) : null;

    return state.data
      .slice()
      .sort((a, b) => +new Date(b.fecha) - +new Date(a.fecha))
      .filter((row) => {
        const okCot = !nCot || normalize(row.cotizacion).includes(nCot);
        const okCli = !nCli || normalize(row.cliente).includes(nCli);
        const okRif = !nRif || normalize(row.cedula_rif).includes(nRif);

        const d = new Date(row.fecha);
        const okFrom = !from || d >= from;
        const okTo = !to || d <= to;

        return okCot && okCli && okRif && okFrom && okTo;
      });
  }, [state, qCotizacion, qCliente, qRif, dateFrom, dateTo]);

  // pagination for the filtered quotes
  const {
    currentData: pageItems,
    currentPage,
    maxPage,
    jump,
  } = usePagination(filtered, 5);

  const clearFilters = () => {
    setQCotizacion("");
    setQCliente("");
    setQRif("");
    setDateFrom("");
    setDateTo("");
  };

  return (
    <div className="flex flex-col space-y-3 w-full h-full lg:p-4 min-h-0 overflow-auto">
      {" "}
      <div className="shrink-0">
        <PageHeader
          title="Registro de Cotizaciones"
          subtitle="Busque y filtre por cotización, cliente, cédula/RIF y fechas"
        />
      </div>
      <div
        className="
          relative
          rounded-2xl p-4
          bg-white/10
          backdrop-blur-xl
          border border-white/20
          shadow-xl
          flex flex-col gap-4
        "
      >
        {" "}
        {/* Filtros */}
        <div
          className="
            relative w-full
            rounded-2xl
            bg-white/10 backdrop-blur-xl
            border border-white/20
            shadow-2xl
            overflow-hidden
            p-4 lg:p-6
            shrink-0
          "
        >
          <div className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-transparent pointer-events-none" />

          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label>Nº Cotización</Label>
              <TextInput
                value={qCotizacion}
                onChange={(e) => setQCotizacion(e.target.value)}
                placeholder="Ej: 26-0001"
              />
            </div>

            <div className="space-y-2">
              <Label>Cliente</Label>
              <TextInput
                value={qCliente}
                onChange={(e) => setQCliente(e.target.value)}
                placeholder="Ej: Omar Cordova"
              />
            </div>

            <div className="space-y-2">
              <Label>Cédula / RIF</Label>
              <TextInput
                value={qRif}
                onChange={(e) => setQRif(e.target.value)}
                placeholder="Ej: 28739420"
              />
            </div>

            <div className="space-y-2">
              <Label>Desde</Label>
              <TextInput
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Hasta</Label>
              <TextInput
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row gap-2 sm:justify-between sm:items-center pt-1">
              <div className="text-sm text-black/70">
                {state.status === "success" ? (
                  <>
                    Mostrando{" "}
                    <span className="font-semibold">{pageItems.length}</span> de{" "}
                    <span className="font-semibold">{filtered.length}</span>{" "}
                    (página {currentPage} de {maxPage})
                  </>
                ) : (
                  <span className="text-black/60">—</span>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  color="light"
                  onClick={clearFilters}
                  className="rounded-xl"
                >
                  Limpiar filtros
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Tabla */}
        <div className="flex flex-col flex-1 min-h-0">
          <div className="relative z-10 lg:h-full overflow-auto">
            {state.status === "loading" && (
              <div className="lg:h-full w-full flex items-center justify-center p-8">
                <Spinner size="xl" />
              </div>
            )}

            {state.status === "error" && (
              <div className="p-6 text-red-600">{state.message}</div>
            )}

            {state.status === "success" && filtered.length === 0 && (
              <div className="p-6 text-black/70">
                No hay resultados con los filtros actuales.
              </div>
            )}

            {state.status === "success" && filtered.length > 0 && (
              <>
                <Table hoverable>
                  <TableHead>
                    <TableHeadCell>Nº</TableHeadCell>
                    <TableHeadCell>Cliente</TableHeadCell>
                    <TableHeadCell className="hidden md:table-cell">
                      Cédula/RIF
                    </TableHeadCell>
                    <TableHeadCell>Fecha</TableHeadCell>
                    <TableHeadCell className="hidden lg:table-cell">
                      Teléfono
                    </TableHeadCell>
                    <TableHeadCell className="hidden lg:table-cell">
                      Pago
                    </TableHeadCell>
                  </TableHead>

                  <TableBody className="divide-y bg-white">
                    {pageItems.map((r) => (
                      <TableRow
                        onClick={() => Cotizacion.getById(r.id)}
                        key={r.id}
                        className="bg-transparent cursor-pointer"
                      >
                        <TableCell className="font-semibold">
                          {r.cotizacion}
                        </TableCell>
                        <TableCell className="max-w-[220px] truncate">
                          {r.cliente}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {r.cedula_rif}
                        </TableCell>
                        <TableCell>{formatDMY(r.fecha)}</TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {r.telefono}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {r.condicionPago}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </div>

          {state.status === "success" && filtered.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={maxPage}
              onPageChange={jump}
            />
          )}
        </div>
      </div>
    </div>
  );
}
