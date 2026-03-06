import { GestionEmpleadosTable } from "../components/gestionEmpleadosTable";
import { AgregarEmpleadoModal } from "../components/agregarEmpleadoModal";
import { EditarEmpleadoModal } from "../components/editarEmpleadoModal";
import { EliminarEmpleadoModal } from "../components/eliminarEmpleadoModal";
import { HiAdjustments, HiTrash, HiUserAdd } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "flowbite-react";

import { empleados } from "../api/empleados";
import { planta } from "../api/planta";
import { QREmpleado } from "../components/qrEmpleado";

import SkeletonLoader from "../components/skeletonLoader";
import { PageHeader } from "../components/pageHeader";

interface User {
  id: number;
  nombre: string;
  apellido: string;
  cedula: number;
  planta: string;
  activo?: boolean;
}

const emptyUser: User = {
  id: 1,
  nombre: "",
  apellido: "",
  cedula: 0,
  planta: "",
};

export function EmpleadosPage() {
  const [openModalAgregar, setOpenModalAgregar] = useState(false);
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);
  const [rowSelected, setRowSelected] = useState<User | null>(null);

  const [loading, setLoading]= useState(true)

  const setRow = (user: User) => {
    setRowSelected(user);
  };

  const [plantasList, setPlantasList] = useState([]);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const empleado = await empleados.getAll();
        setUserList(empleado);
        const plantas = await planta.getAll();
        setPlantasList(plantas);
        setLoading(false)
      } catch (error) {
        console.error("Error al cargar empleados:", error);
      }
    };

    fetchData();
  }, []);

  if(loading)return <SkeletonLoader />

  return (
    <div className="p-4 flex flex-col space-y-8 overflow-auto">
      <PageHeader title="Gestion de Empleados" subtitle="Gestiona los empleados pertenecientes a la empresa"/>
      <GestionEmpleadosTable rowSelected={setRow} users={userList} />
      <div className="flex items-center justify-center">
        <ButtonGroup>
          <div className="grid grid-cols-2 md:grid-cols-4">
            <Button
              onClick={() => {
                setOpenModalAgregar(!openModalAgregar);
              }}
              color="alternative"
            >
              <HiUserAdd className="me-2 h-4 w-4" />
              Agregar
            </Button>
            <Button
              onClick={() => {
                if (rowSelected) {
                  setOpenModalEditar(!openModalEditar);
                }
              }}
              color="alternative"
            >
              <HiAdjustments className="me-2 h-4 w-4" />
              Editar
            </Button>
            <Button
              onClick={() => {
                if (rowSelected) {
                  setOpenModalEliminar(!openModalEliminar);
                }
              }}
              color="alternative"
            >
              <HiTrash className="me-2 h-4 w-4" />
              Eliminar
            </Button>
            <QREmpleado
              nombre={rowSelected?.nombre as string}
              apellido={rowSelected?.apellido as string}
              cedula={rowSelected?.cedula as number}
              id={rowSelected?.id as number}
            />
          </div>
        </ButtonGroup>
      </div>
      <AgregarEmpleadoModal
        openModalProp={openModalAgregar}
        setOpenModal={setOpenModalAgregar}
        plantas={plantasList}
      />
      <EditarEmpleadoModal
        openModalProp={openModalEditar}
        setOpenModal={setOpenModalEditar}
        user={rowSelected ? rowSelected : emptyUser}
        plantas={plantasList}
      />
      <EliminarEmpleadoModal
        openModalProp={openModalEliminar}
        setOpenModal={setOpenModalEliminar}
        user={rowSelected ? rowSelected : emptyUser}
      />
    </div>
  );
}
