import {
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
  Select,
  Button,
} from "flowbite-react";

import { useState, useEffect } from "react";
import { ErrorModal } from "./errorModal";
import { empleados } from "../api/empleados";

interface ComponentProps {
  openModalProp: boolean;
  setOpenModal: (open: boolean) => void;
  user: {
    id: number;
    nombre: string;
    apellido: string;
    cedula: number;
    planta: string;
  };
  plantas: {
    id: number;
    nombre: string;
  }[];
}

export function EditarEmpleadoModal(componentProps: ComponentProps) {
  const { openModalProp, setOpenModal, user, plantas } = componentProps;
  console.log(user, plantas);
  const [nombre, setnombre] = useState(user.nombre);
  const [apellido, setApellido] = useState(user.apellido);
  const [cedula, setCedula] = useState(user.cedula);
  const [planta_id, setPlanta_id] = useState(Number(user.planta));
  const [isLoading, setIsLoading] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setOpenErrorModal(false);
    setIsLoading(true);
    try {
      const res = await empleados.update(
        user.id,
        nombre,
        apellido,
        cedula,
        planta_id as number
      );

      setOpenModal(!openModalProp);
      return res
    } catch (err) {
      setOpenErrorModal(true);
      setMensaje((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setnombre(user.nombre);
    setApellido(user.apellido);
    setCedula(user.cedula);

    // Buscar la planta en la lista según el nombre que trae el usuario
    const plantaEncontrada = plantas.find((p) => p.nombre === user.planta);
    setPlanta_id(plantaEncontrada ? plantaEncontrada.id : 0);
  }, [user, plantas]);

  return (
    <div className="">
      <Modal
        position="center"
        dismissible
        show={openModalProp}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
      >
        <ModalHeader />
        <ModalBody>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 ">
              Modificar usuario
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="flex space-x-1">
                <div>
                  <div className=" block">
                    <Label htmlFor="Nombre">Nombre</Label>
                  </div>
                  <TextInput
                    value={nombre}
                    id="Nombre"
                    required
                    onChange={(e) => setnombre(e.target.value)}
                  />
                </div>
                <div>
                  <div className="block">
                    <Label htmlFor="Apellido">Apellido</Label>
                  </div>
                  <TextInput
                    onChange={(e) => setApellido(e.target.value)}
                    value={apellido}
                    id="Apellido"
                    required
                  />
                </div>
              </div>
              <div>
                <div className=" block">
                  <Label htmlFor="Cedula">Cedula</Label>
                </div>
                <TextInput
                  onChange={(e) => setCedula(Number(e.target.value))}
                  value={cedula}
                  id="Cedula"
                  required
                />
              </div>
              <div>
                <div className="flex flex-col w-1/2">
                  <div className="mb-2 block">
                    <Label htmlFor="Departamento">Departamento</Label>
                  </div>
                  <Select
                    onChange={(e) => setPlanta_id(Number(e.target.value))}
                    value={planta_id}
                    id="Plantas"
                    required
                  >
                    {plantas.map((planta, index) => (
                      <option key={index} value={planta.id}>
                        {planta.nombre}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading} 
                className={`w-full py-2 rounded-md transition duration-150 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isLoading ? "Actualizando..." : "Actualizar empleado"}
              </Button>
            </form>
          </div>
        </ModalBody>
      </Modal>
      <ErrorModal
        openModal={openErrorModal}
        setOpenModal={setOpenErrorModal}
        mensaje={mensaje}
      />
    </div>
  );
}
