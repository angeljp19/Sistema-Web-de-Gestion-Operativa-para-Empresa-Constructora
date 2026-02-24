import {
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
  Select,
  Button,
} from "flowbite-react";

import { useRef, useState } from "react";
import {empleados} from "../api/empleados"
import { ErrorModal } from "./errorModal";

interface ComponentProps {
  openModalProp: boolean;
  setOpenModal: (open: boolean) => void;
  plantas: {
    id: number;
    nombre: string;
  }[];
}

export function AgregarEmpleadoModal(componentProps: ComponentProps) {
  const { openModalProp, setOpenModal, plantas } = componentProps;
  const nombreInputRef = useRef<HTMLInputElement>(null);

  const [nombre, setnombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState(0);
  const [planta_id, setPlanta_id] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [mensaje, setMensaje] = useState("")

   const handleSubmit = async (e: any) => {
    e.preventDefault();
    setOpenErrorModal(false);
    setIsLoading(true);
    try {
      const res = await empleados.create(
        nombre,
        apellido,
        cedula,
        planta_id as number
      );

      setOpenModal(!openModalProp);
      return res
    } catch (err) {
      setOpenErrorModal(true);
      setMensaje((err as Error).message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <Modal
        position="center"
        dismissible
        show={openModalProp}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
        initialFocus={nombreInputRef}
      >
        <ModalHeader />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 ">
                Agregar nuevo usuario
              </h3>
              <div className="flex space-x-1">
                <div>
                  <div className=" block">
                    <Label htmlFor="Nombre">Nombre</Label>
                  </div>
                  <TextInput
                    onChange={(e) => setnombre(e.target.value)}
                    id="Nombre"
                    ref={nombreInputRef}
                    required
                  />
                </div>
                <div>
                  <div className="block">
                    <Label htmlFor="Apellido">Apellido</Label>
                  </div>
                  <TextInput
                    onChange={(e) => setApellido(e.target.value)}
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
                  id="Cedula"
                  required
                />
              </div>
              <div className="flex w-full justify-between space-x-1">
                <div className="flex flex-col w-1/2">
                  <div className="mb-2 block">
                    <Label htmlFor="planta">Planta</Label>
                  </div>
                  <Select
                    value={planta_id === null ? "" : planta_id}
                    onChange={(e) => {
                      const stringValue = e.target.value;

                      if (stringValue === "") {
                        setPlanta_id(null);
                      } else {
                        setPlanta_id(Number(stringValue));
                      }
                    }}
                    id="planta"
                    required
                  >
                    <option value="" disabled>
                      Selecciona una planta
                    </option>

                    {plantas.map((planta) => (
                      <option key={planta.id} value={planta.id}>
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
                {isLoading ? "Agregando..." : "Agregar usuario"}
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <ErrorModal openModal={openErrorModal} setOpenModal={setOpenErrorModal} mensaje={mensaje} />
    </div>
  );
}
