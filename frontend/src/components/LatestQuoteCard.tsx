// LatestQuotesCard.tsx
import { useEffect, useState } from "react";
import { Cotizacion } from "../api/cotizacion";
import { formatDMY } from "../utils/utils";

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

export function LatestQuotesCard() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  useEffect(() => {
    Cotizacion.getQuotes().then((data) => {
      setQuotes(data);
    });
  }, []);

  return (
    <div className="flex flex-col w-full max-h-svh overflow-auto lg:h-full rounded-2xl bg-white p-3 shadow-2xl">
      <div>
        <h2 className="text-lg lg:text-xl font-bold p-4">Últimas Cotizaciones</h2>
      </div>
      <div className="flex flex-col gap-1">
        {quotes.slice(0, 5).map((q) => (
          <div
            key={q.id}
            className="cursor-pointer p-2 flex flex-col border-b transition-all duration-100 hover:scale-[1.01] hover: hover:border-yellow-300"
          >
            <span className="flex w-full justify-between">
              <p className="font-semibold">{q.cliente}</p>
              <p className="font-light">{q.cotizacion}</p>
            </span>
            <span className="flex w-full justify-between">
              <p className="font-normal">{q.cedula_rif}</p>
              <p className="font-light">{formatDMY(q.fecha)}</p>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
