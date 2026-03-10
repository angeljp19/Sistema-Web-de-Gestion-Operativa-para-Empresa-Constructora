import { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Modal,
  Label,
  TextInput,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "flowbite-react";
import { HiPlus, HiPencilAlt, HiTrash } from "react-icons/hi";
import { Productos } from "../api/productos";
import { ErrorModal } from "../components/errorModal";
import { PageHeader } from "../components/pageHeader";
import SkeletonLoader from "../components/skeletonLoader";

interface Producto {
  id: number;
  nombre: string;
}


export function GestionProductosPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [rowSelected, setRowSelected] = useState<Producto | null>(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [openModalAgregar, setOpenModalAgregar] = useState(false);
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);

  const [loading, setLoading] = useState(true);

  const [createInput, setCreateInput] = useState("");

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await Productos.getAll();
        setProductos(data);
        setLoading(false)
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };

    fetchProductos();
  }, []);

  const agregarProducto = async (nombre: string) => {
    try {
      await Productos.create(nombre);
      window.location.reload();
    } catch (err) {
      setErrorMessage((err as Error).message);
      setError(true);
    }
  };

  const editarProducto = async (producto: Producto) => {
    try {
      await Productos.update(producto.id, producto.nombre);
      window.location.reload();
    } catch (err) {
      setErrorMessage((err as Error).message);
      setError(true);
    }
  };

  const eliminarProducto = async (id: number) => {
    try {
      await Productos.delete(id);
      window.location.reload();
    } catch (err) {
      setErrorMessage((err as Error).message);
      setError(true);
    }
  };

  if(loading) return <SkeletonLoader/>;

  return (
    <div className="p-4 flex flex-col space-y-8">
        <PageHeader title=" Gestión de Productos" subtitle="Gestiona los productos disponibles para las cotizaciones"/>


      <div className="overflow-x-auto max-h-[50vh] rounded-2xl" >
        <Table hoverable>
          <TableHead>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Nombre del Producto</TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {productos.map((producto) => (
              <TableRow
                key={producto.id}
                className={`cursor-pointer ${
                  rowSelected?.id === producto.id
                    ?`bg-blue-700 hover:bg-blue-700 text-white` : `bg-white `
                }`}
                onClick={() => setRowSelected(producto)}
              >
                <TableCell>{producto.id}</TableCell>
                <TableCell className="font-medium">{producto.nombre}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center">
        <ButtonGroup>
          <Button color="alternative" onClick={() => setOpenModalAgregar(true)}>
            <HiPlus className="me-2 h-4 w-4" />
            Agregar
          </Button>
          <Button
            color="alternative"
            onClick={() => rowSelected && setOpenModalEditar(true)}
            disabled={!rowSelected}
          >
            <HiPencilAlt className="me-2 h-4 w-4" />
            Editar
          </Button>
          <Button
            color="alternative"
            onClick={() => rowSelected && setOpenModalEliminar(true)}
            disabled={!rowSelected}
          >
            <HiTrash className="me-2 h-4 w-4" />
            Eliminar
          </Button>
        </ButtonGroup>
      </div>

      <Modal show={openModalAgregar} onClose={() => setOpenModalAgregar(false)}>
        <ModalHeader>Agregar Producto</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <Label htmlFor="nombre">Nombre del producto</Label>
              <TextInput
                onChange={(e) => setCreateInput(e.target.value)}
                id="nombre"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              agregarProducto(createInput);
              setOpenModalAgregar(false);
            }}
          >
            Guardar
          </Button>
          <Button color="gray" onClick={() => setOpenModalAgregar(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal show={openModalEditar} onClose={() => setOpenModalEditar(false)}>
        <ModalHeader>Editar Producto</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-nombre">Nuevo nombre del producto</Label>
              <TextInput
                id="edit-nombre"
                defaultValue={rowSelected?.nombre}
                placeholder="Ej. Grava gruesa"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              const nombre = (
                document.getElementById("edit-nombre") as HTMLInputElement
              )?.value;
              if (rowSelected) editarProducto({ ...rowSelected, nombre });
              setOpenModalEditar(false);
            }}
          >
            Guardar cambios
          </Button>
          <Button color="gray" onClick={() => setOpenModalEditar(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        show={openModalEliminar}
        onClose={() => setOpenModalEliminar(false)}
      >
        <ModalHeader>Eliminar Producto</ModalHeader>
        <ModalBody>
          <p>
            ¿Estás seguro de que deseas eliminar el producto{" "}
            <strong>{rowSelected?.nombre}</strong>?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            color="failure"
            onClick={() => {
              if (rowSelected) eliminarProducto(rowSelected.id);
              setOpenModalEliminar(false);
            }}
          >
            Eliminar
          </Button>
          <Button color="gray" onClick={() => setOpenModalEliminar(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
      <ErrorModal
        mensaje={errorMessage}
        openModal={error}
        setOpenModal={setError}
      />
    </div>
  );
}
