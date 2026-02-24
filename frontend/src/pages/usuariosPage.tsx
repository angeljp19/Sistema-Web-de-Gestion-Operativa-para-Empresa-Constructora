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
  ToggleSwitch,
} from "flowbite-react";
import { HiPlus, HiPencilAlt, HiTrash } from "react-icons/hi";
import { usuariosAPI } from "../api/usuarios";
import { ErrorModal } from "../components/errorModal";
import { PageHeader } from "../components/pageHeader";
import SkeletonLoader from "../components/skeletonLoader";

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  cedula: number;
  password?: string;
  activo: boolean;
  fecha_creacion?: string;
}

const emptyUsuario: Usuario = {
  id: 0,
  nombre: "",
  apellido: "",
  email: "",
  cedula: 0,
  password: "",
  activo: true,
};

export function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [rowSelected, setRowSelected] = useState<Usuario | null>(null);

  const [openAgregar, setOpenAgregar] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [openEliminar, setOpenEliminar] = useState(false);

  const [nuevoUsuario, setNuevoUsuario] = useState<Usuario>(emptyUsuario);
  const [editUsuario, setEditUsuario] = useState<Usuario>(emptyUsuario);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const data = await usuariosAPI.getAll();
        setUsuarios(data);
        setLoading(false)
      } catch (err) {
        console.error("Error al cargar usuarios:", err);
      }
    };

    fetchUsuarios();
  }, []);
  const handleAgregar = async () => {
    try {
      await usuariosAPI.create(
        nuevoUsuario.nombre,
        nuevoUsuario.apellido,
        nuevoUsuario.email,
        nuevoUsuario.cedula,
        nuevoUsuario.password!
      );

      window.location.reload();
    } catch (err) {
      setErrorMessage((err as Error).message);
      setError(true);
    }
  };

  const handleEditar = async () => {
    try {
      if (!rowSelected) return;

      await usuariosAPI.update(
        editUsuario.id,
        editUsuario.nombre,
        editUsuario.apellido,
        editUsuario.email,
        editUsuario.cedula
      );

      window.location.reload();
    } catch (err) {
      setErrorMessage((err as Error).message);
      setError(true);
    }
  };
  const handleEliminar = async () => {
    try {
      if (!rowSelected) return;
      await usuariosAPI.delete(rowSelected.id); // <-- Ya conectado
      window.location.reload();
    } catch (err) {
      setErrorMessage((err as Error).message);
      setError(true);
    }
  };
  if(loading) return <SkeletonLoader />

  return (
    <div className="p-4 flex flex-col space-y-8">
      <PageHeader title="Gestión de Usuarios" subtitle="Gestiona los usuarios que pueden acceder al sistema" />


      <div className="overflow-x-auto max-h-[50vh]">
        <Table hoverable>
          <TableHead>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Nombre</TableHeadCell>
            <TableHeadCell>Apellido</TableHeadCell>
            <TableHeadCell>Email</TableHeadCell>
            <TableHeadCell>Cédula</TableHeadCell>
            <TableHeadCell>Activo</TableHeadCell>
          </TableHead>

          <TableBody className="divide-y">
            {usuarios.map((usuario) => (
              <TableRow
                key={usuario.id}
                className={`cursor-pointer ${
                  rowSelected?.id === usuario.id
                    ? `bg-blue-700 hover:bg-blue-700 text-white`
                    : `bg-white `
                }`}
                onClick={() => {
                  setRowSelected(usuario);
                  setEditUsuario(usuario);
                }}
              >
                <TableCell>{usuario.id}</TableCell>
                <TableCell>{usuario.nombre}</TableCell>
                <TableCell>{usuario.apellido}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.cedula}</TableCell>
                <TableCell>{usuario.activo ? "Sí" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-center">
        <ButtonGroup>
          <Button color="alternative" onClick={() => setOpenAgregar(true)}>
            <HiPlus className="me-2 h-4 w-4" />
            Agregar
          </Button>
          <Button
            color="alternative"
            onClick={() => rowSelected && setOpenEditar(true)}
            disabled={!rowSelected}
          >
            <HiPencilAlt className="me-2 h-4 w-4" />
            Editar
          </Button>
          <Button
            color="alternative"
            onClick={() => rowSelected && setOpenEliminar(true)}
            disabled={!rowSelected}
          >
            <HiTrash className="me-2 h-4 w-4" />
            Eliminar
          </Button>
        </ButtonGroup>
      </div>

      {/* MODAL AGREGAR */}
      <Modal show={openAgregar} onClose={() => setOpenAgregar(false)}>
        <ModalHeader>Agregar Usuario</ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Nombre</Label>
              <TextInput
                onChange={(e) =>
                  setNuevoUsuario({ ...nuevoUsuario, nombre: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Apellido</Label>
              <TextInput
                onChange={(e) =>
                  setNuevoUsuario({ ...nuevoUsuario, apellido: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Email</Label>
              <TextInput
                type="email"
                onChange={(e) =>
                  setNuevoUsuario({ ...nuevoUsuario, email: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Cédula</Label>
              <TextInput
                type="number"
                onChange={(e) =>
                  setNuevoUsuario({
                    ...nuevoUsuario,
                    cedula: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="md:col-span-2">
              <Label>Contraseña</Label>
              <TextInput
                type="password"
                onChange={(e) =>
                  setNuevoUsuario({ ...nuevoUsuario, password: e.target.value })
                }
              />
            </div>

            <div className="md:col-span-2">
              <ToggleSwitch
                checked={nuevoUsuario.activo}
                label="Usuario activo"
                onChange={(value) =>
                  setNuevoUsuario({ ...nuevoUsuario, activo: value })
                }
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleAgregar}>Guardar</Button>
          <Button color="gray" onClick={() => setOpenAgregar(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      {/* MODAL EDITAR */}
      <Modal show={openEditar} onClose={() => setOpenEditar(false)}>
        <ModalHeader>Editar Usuario</ModalHeader>
        <ModalBody>
          {rowSelected && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Nombre</Label>
                <TextInput
                  value={editUsuario.nombre}
                  onChange={(e) =>
                    setEditUsuario({ ...editUsuario, nombre: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Apellido</Label>
                <TextInput
                  value={editUsuario.apellido}
                  onChange={(e) =>
                    setEditUsuario({ ...editUsuario, apellido: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Email</Label>
                <TextInput
                  value={editUsuario.email}
                  onChange={(e) =>
                    setEditUsuario({ ...editUsuario, email: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Cédula</Label>
                <TextInput
                  type="number"
                  value={editUsuario.cedula}
                  onChange={(e) =>
                    setEditUsuario({
                      ...editUsuario,
                      cedula: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div className="md:col-span-2">
                <ToggleSwitch
                  checked={editUsuario.activo}
                  label="Usuario activo"
                  onChange={(value) =>
                    setEditUsuario({ ...editUsuario, activo: value })
                  }
                />
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleEditar}>Guardar cambios</Button>
          <Button color="gray" onClick={() => setOpenEditar(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      {/* MODAL ELIMINAR */}
      <Modal show={openEliminar} onClose={() => setOpenEliminar(false)}>
        <ModalHeader>Eliminar Usuario</ModalHeader>
        <ModalBody>
          <p>
            ¿Deseas eliminar al usuario{" "}
            <strong>
              {rowSelected?.nombre} {rowSelected?.apellido}
            </strong>
            ?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="failure" onClick={handleEliminar}>
            Eliminar
          </Button>
          <Button color="gray" onClick={() => setOpenEliminar(false)}>
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
