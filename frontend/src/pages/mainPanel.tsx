
import { LuUsers } from "react-icons/lu";
import { LuBrickWall } from "react-icons/lu";
import { LuTable2 } from "react-icons/lu";
import { LuPackagePlus } from "react-icons/lu";
import { LuQrCode } from "react-icons/lu";
import { LuUserPlus } from "react-icons/lu";
import { LuChartBar } from "react-icons/lu";
import { PageHeader } from "../components/pageHeader";
import { DashboardCard } from "../components/dashboardCards";

export function MainPanel() {
  return (
    <div className="flex flex-col py-4 px-4 w-full h-full  items-center">
 
      <PageHeader title="Panel Principal" subtitle="Encuentra un conjunto de herramientas para la gestion interna de la empresa" />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 w-full h-full py-4">
        <DashboardCard link="/cuyuniApp/cotizacionMateriales" icon={LuBrickWall} title="Cotizacion Materiales" />
        <DashboardCard link="/cuyuniApp/cotizacionConcreto" icon={LuTable2} title="Cotizacion Concreto" />
        <DashboardCard link="/cuyuniApp/gestionProductos" icon={LuPackagePlus} title="Gestion Productos" />
        <DashboardCard link="/cuyuniApp/empleados" icon={LuUsers} title="Empleados" />
        <DashboardCard link="/cuyuniApp/entradasalida" icon={LuChartBar} title="Entrada y salida empleados" />
        <DashboardCard link="/cuyuniApp/escaneo" icon={LuQrCode} title="Escanear QR" />
        <DashboardCard link="/cuyuniApp/usuarios" icon={LuUserPlus} title="Usuarios" />

      </div>
    </div>
  );
}

/** 
         <Link
          to={"/cotizacionMateriales"}
          className="p-5 size-45 flex justify-center items-center border rounded-lg shadow-2xl border-gray-200 transition-all duration-200 hover:bg-gray-200"
        >
          <h5 className="text-2xl text-center font-bold tracking-tight text-gray-900 ">
            Cotizacion Materiales
          </h5>
        </Link>
        <Link
          to={"/cotizacionConcreto"}
          className="p-5 size-45 flex justify-center items-center border rounded-lg shadow-2xl border-gray-200 transition-all duration-200 hover:bg-gray-200"
        >
          <h5 className="text-2xl text-center font-bold tracking-tight text-gray-900 ">
             Cotizacion Concreto
          </h5>
        </Link>
        <Link
          to={"/gestionProductos"}
          className="p-5 size-45 flex justify-center items-center border rounded-lg shadow-2xl border-gray-200 transition-all duration-200 hover:bg-gray-200"
        >
          <h5 className="text-2xl text-center font-bold tracking-tight text-gray-900 ">
            Gestion Productos
          </h5>
        </Link>
        <Link
          to={"/empleados"}
          className="p-5 size-45 flex justify-center items-center border rounded-lg shadow-2xl border-gray-200 transition-all duration-200 hover:bg-gray-200"
        >
          <h5 className="text-2xl text-center font-bold tracking-tight text-gray-900 ">
            Empleados
          </h5>
        </Link>
        <Link
          to={"/entradasalida"}
          className="p-5 size-45 flex justify-center items-center border rounded-lg shadow-2xl border-gray-200 transition-all duration-200 hover:bg-gray-200"
        >
          <h5 className="text-2xl text-center font-bold tracking-tight text-gray-900 ">
            Entrada y salida empleados
          </h5>
        </Link>
        <Link
          to={"/escaneo"}
          className="p-5 size-45 flex justify-center items-center border rounded-lg shadow-2xl border-gray-200 transition-all duration-200 hover:bg-gray-200"
        >
          <h5 className="text-2xl text-center font-bold tracking-tight text-gray-900 ">
            Escanear QR
          </h5>
        </Link>
        <Link
          to={"/usuarios"}
          className="p-5 size-45 flex justify-center items-center border rounded-lg shadow-2xl border-gray-200 transition-all duration-200 hover:bg-gray-200"
        >
          <h5 className="text-2xl text-center font-bold tracking-tight text-gray-900 ">
           Usuarios
          </h5>
        </Link>
 * **/ 
