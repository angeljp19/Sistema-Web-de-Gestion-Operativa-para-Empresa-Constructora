import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

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
    activo?: boolean;
  };
}

export function EliminarEmpleadoModal(componentProps: ComponentProps) {
  const { openModalProp, setOpenModal, user } = componentProps;
  const [isLoading, setIsLoading] = useState(false);
  const activo = false;
  const handleSubmit = async () => {
 
    setIsLoading(true);

    try {
      const res = await empleados.update(user.id, undefined, undefined, undefined, undefined, activo);
      setOpenModal(!openModalProp);
      return res
    } catch (err) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Modal
        show={openModalProp}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Estas seguro de que quieres eliminar al usuario {user.nombre}?
            </h3>
            <div className="flex justify-center gap-4">
              
              <Button
                type="submit"
                disabled={isLoading}
                onClick={() => {
                  handleSubmit()
                  setOpenModal(false);
                }}
                className={`py-2 rounded-md transition duration-150 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 text-white hover:bg-red-500"
                }`}
              >
                {isLoading ? "Eliminando..." : "Si estoy seguro"}
              </Button>
              <Button color="alternative" onClick={() => setOpenModal(false)}>
                No, cancelar
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
