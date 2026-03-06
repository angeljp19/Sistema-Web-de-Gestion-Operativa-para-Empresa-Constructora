// CotizacionConcretoPage.tsx
import { useState } from "react";
import { Label, TextInput, Textarea, Button } from "flowbite-react";
import { CotizacionConcreto } from "../components/cotizacionConcreto";
import { Cotizacion } from "../api/cotizacion";
import { PageHeader } from "../components/pageHeader";

interface Producto {
  item: number;
  unidad: string;
  cantidad: string;
  descripcion: string;
  resistencia: string;
  precio: string;
  total: number;
}

interface formProps {
  cliente: "";
  rif: "";
  telefono: "";
  direccion: "";
  atencion: "";
  email: "";
  cotizacionNum: "";
  fecha: "";
  validezOferta: "";
  condicionPago: "";
  personaContacto: "";
  numeroDirecto: "";
}

export function CotizacionConcretoPage() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [form, setForm] = useState<formProps>({
    cliente: "",
    rif: "",
    telefono: "",
    direccion: "",
    atencion: "",
    email: "",
    cotizacionNum: "",
    fecha: "",
    validezOferta: "",
    condicionPago: "",
    personaContacto: "",
    numeroDirecto: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await Cotizacion.createConcreto(productos, form);
  };

  return (
    <div className="flex flex-col  lg:h-full w-full p-1 lg:p-4 gap-6 overflow-auto">
      <div className="shrink-0">
        <PageHeader
          title="Cotización de Concreto"
          subtitle="Complete la información del cliente y los datos de la cotización"
        />
      </div>
      <div className="flex lg:h-full flex-col lg:flex-row  min-h-0 w-full gap-4  overflow-auto">
        {/* Panel Formulario */}
        <div
          className="
            relative w-full lg:w-1/2
            rounded-2xl lg:h-full
            backdrop-blur-xl shadow-2xl
            lg:overflow-auto
            p-6 lg:flex-1"
        >
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
          >
            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label>Cliente</Label>
              <TextInput
                name="cliente"
                value={form.cliente}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>C.I / RIF"</Label>
              <TextInput
                name="rif"
                value={form.rif}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Teléfono</Label>
              <TextInput
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label>Dirección</Label>
              <Textarea
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Atención</Label>
              <TextInput
                name="atencion"
                value={form.atencion}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>E-mail</Label>
              <TextInput
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Cotización Nº</Label>
              <TextInput
                name="cotizacionNum"
                value={form.cotizacionNum}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Fecha</Label>
              <TextInput
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Validez de Oferta</Label>
              <TextInput
                name="validezOferta"
                value={form.validezOferta}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Condición de Pago</Label>
              <TextInput
                name="condicionPago"
                value={form.condicionPago}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Persona de Contacto</Label>
              <TextInput
                name="personaContacto"
                value={form.personaContacto}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Nº Directo</Label>
              <TextInput
                name="numeroDirecto"
                value={form.numeroDirecto}
                onChange={handleChange}
              />
            </div>

            <div className="col-span-1 md:col-span-2 flex justify-end">
              <Button
                type="submit"
                className="
                    bg-yellow-400 font-semibold
                    hover:bg-yellow-300
                    focus:ring-yellow-400
                    rounded-xl
                  "
              >
                Guardar Cotización
              </Button>
            </div>
          </form>
        </div>
        <div
          className="
            w-full lg:w-1/2
            rounded-2xl
            backdrop-blur-xl shadow-2xl
            overflow-au
            flex
            h-[70dvh] sm:h-[65dvh]
            lg:h-auto lg:flex-1
          "
        >
          <div className="w-full lg:h-full overflow-y-auto flex justify-center items-start lg:p-2">
            <CotizacionConcreto
              productos={productos}
              setProductos={setProductos}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/* 

        <div
          className="
            w-full lg:w-1/2
            rounded-2xl
            backdrop-blur-xl shadow-2xl
            overflow-au
            flex
            h-[70dvh] sm:h-[65dvh]
            lg:h-auto lg:flex-1
          "
        >
          <div className="w-full lg:h-full overflow-y-auto flex justify-center items-start p-2">
            <CotizacionConcreto
              productos={productos}
              setProductos={setProductos}
            />
          </div>
        </div>
*/
