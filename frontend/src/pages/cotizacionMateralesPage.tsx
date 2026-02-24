import { useState } from "react";
import { Label, TextInput, Textarea, Button } from "flowbite-react";
import { CotizacionProductos } from "../components/cotizacionProductos";
import { Cotizacion } from "../api/cotizacion";
import { PageHeader } from "../components/pageHeader";

interface Producto {
  item: number;
  unidad: string;
  cantidad: string;
  descripcion: string;
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

export function CotizacionMaterialesPage() {
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
    await Cotizacion.createMateriales(productos, form);
  };

return (
    <div className="flex flex-col flex-1 min-h-0 w-full p-4 space-y-6">
      
      <PageHeader
        title="Cotización de Materiales"
        subtitle="Complete la información del cliente y los datos de la cotización"
      />


      <div className="flex flex-1 min-h-0 w-fullp-4 gap-4">
        
  
     
        <div className="rounded-2xl p-6 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex w-1/2 overflow-y-auto">
         
          <div className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
         <form
            onSubmit={handleSubmit}
            className="

    grid grid-cols-1 md:grid-cols-2 gap-6
    overflow-y-auto
  
    w-full
    pr-2
  "
          >
            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label className="text-white/80 font-medium">Cliente</Label>
              <TextInput
                name="cliente"
                value={form.cliente}
                onChange={handleChange}
                required
                className="
                bg-white/10 border-white/20 text-white
                focus:border-yellow-400 focus:ring-yellow-400
              "
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/80 font-medium">C.I / RIF</Label>
              <TextInput
                name="rif"
                value={form.rif}
                onChange={handleChange}
                required
                className="
                bg-white/10 border-white/20 text-white
                focus:border-yellow-400 focus:ring-yellow-400
              "
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/80 font-medium">Teléfono</Label>
              <TextInput
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                className="
                bg-white/10 border-white/20 text-white
                focus:border-yellow-400 focus:ring-yellow-400
              "
              />
            </div>

            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label className="text-white/80 font-medium">Dirección</Label>
              <Textarea
                name="direccion"
                value={form.direccion}
                onChange={handleChange}
                rows={3}
                className="
                bg-white/10 border-white/20 text-white
                focus:border-yellow-400 focus:ring-yellow-400
              "
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/80 font-medium">Atención</Label>
              <TextInput
                name="atencion"
                value={form.atencion}
                onChange={handleChange}
                className="
                bg-white/10 border-white/20 text-white
                focus:border-yellow-400 focus:ring-yellow-400
              "
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/80 font-medium">E-mail</Label>
              <TextInput
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="
                bg-white/10 border-white/20 text-white
                focus:border-yellow-400 focus:ring-yellow-400
              "
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/80 font-medium">Cotización Nº</Label>
              <TextInput
                name="cotizacionNum"
                value={form.cotizacionNum}
                onChange={handleChange}
                required
                className="
                bg-white/10 border-white/20 text-white
                focus:border-yellow-400 focus:ring-yellow-400
              "
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/80 font-medium">Fecha</Label>
              <TextInput
                type="date"
                name="fecha"
                value={form.fecha}
                onChange={handleChange}
                required
                className="
                bg-white/10 border-white/20 text-white
                focus:border-yellow-400 focus:ring-yellow-400
              "
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/80 font-medium">
                Validez de Oferta
              </Label>
              <TextInput
                name="validezOferta"
                value={form.validezOferta}
                onChange={handleChange}
                className="
                bg-white/10 border-white/20 text-white
                focus:border-yellow-400 focus:ring-yellow-400
              "
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/80 font-medium">
                Condición de Pago
              </Label>
              <TextInput
                name="condicionPago"
                value={form.condicionPago}
                onChange={handleChange}
                className="
                bg-white/10 border-white/20 text-white
                focus:border-yellow-400 focus:ring-yellow-400
              "
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/80 font-medium">
                Persona de Contacto
              </Label>
              <TextInput
                name="personaContacto"
                value={form.personaContacto}
                onChange={handleChange}
                className="
                bg-white/10 border-white/20 text-white
                focus:border-yellow-400 focus:ring-yellow-400
              "
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white/80 font-medium">Nº Directo</Label>
              <TextInput
                name="numeroDirecto"
                value={form.numeroDirecto}
                onChange={handleChange}
                className="
                bg-white/10 border-white/20 text-white
                focus:border-yellow-400 focus:ring-yellow-400
              "
              />
            </div>

            <div className="col-span-1 md:col-span-2 flex justify-end pt-4">
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

     
         <div className="flex justify-center items-center w-1/2 rounded-2xl  bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
          <CotizacionProductos
            productos={productos}
            setProductos={setProductos}
          />
        </div>
      </div>
    </div>
  );
}