import { LuUsers } from "react-icons/lu";
import { LuBrickWall } from "react-icons/lu";
import { LuTable2 } from "react-icons/lu";
import { LuPackagePlus } from "react-icons/lu";
import { LuQrCode } from "react-icons/lu";
import { LuUserPlus } from "react-icons/lu";
import { LuChartBar } from "react-icons/lu";
import { QuoteCarousel } from "../components/carrusel";
import { LatestQuotesCard } from "../components/LatestQuoteCard";
import { PersonalSummary } from "../components/personalSummary";
import { TableEntradaSalida } from "../components/tablaEntradaSalida";
import { MdOutlineRequestQuote } from "react-icons/md";


export function MainPanel() {
  const items = [
    {
      id: "c1",
      title: "Cotizacion de Concreto",
      icon: LuTable2,
      link: "/cuyuniApp/cotizacionConcreto",
    },
    {
      id: "c2",
      title: "Cotizacion de Materiales",
      icon: LuBrickWall,
      link: "/cuyuniApp/cotizacionMateriales",
    },
    {
      id: "c3",
      title: "Escanear QR",
      icon: LuQrCode,
      link: "/cuyuniApp/escaneo",
    },
    {
      id: "c4",
      title: "Registro de Cotizaciones",
      icon: MdOutlineRequestQuote,
      link: "/cuyuniApp/cotizaciones",
    },
    {
      id: "c5",
      title: "Entrada y salida de empleados",
      icon: LuChartBar,
      link: "/cuyuniApp/entradasalida",
    },
    {
      id: "c6",
      title: "Gestion empleados",
      icon: LuUsers,
      link: "/cuyuniApp/empleados",
    },
    {
      id: "c7",
      title: "Gestion Productos",
      icon: LuPackagePlus,
      link: "/cuyuniApp/gestionProductos",
    },
    {
      id: "c8",
      title: "Gestion Usuarios",
      icon: LuUserPlus,
      link: "/cuyuniApp/usuarios",
    },
  ];
  return (
    <div className="flex flex-col lg:flex-row py-4 w-full lg:h-full  items-center overflow-auto">
      <div className="flex flex-col w-full lg:w-2/3 lg:h-full">
        <QuoteCarousel
          items={items}
          initialActiveIndex={1}
        />
        <div className="flex w-full justify-between gap-8 p-4 flex-col lg:flex-row">
          <PersonalSummary />
          <div className="w-full">
            <TableEntradaSalida />
          </div>
        </div>
      </div>
      <div className="flex w-full lg:w-1/3 lg:h-full  justify-center lg:px-10">
        <LatestQuotesCard />
      </div>
    </div>
  );
}