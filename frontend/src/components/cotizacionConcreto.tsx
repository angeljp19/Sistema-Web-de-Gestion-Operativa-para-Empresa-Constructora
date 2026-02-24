import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import {
  Card,
  Label,
  TextInput,
  Select,
  Button,
  Accordion,
  AccordionPanel,
  AccordionTitle,
  AccordionContent,
} from "flowbite-react";

import { Productos } from "../api/productos";

interface Producto {
  item: number;
  unidad: string;
  cantidad: string;
  descripcion: string;
  precio: string;
  resistencia: string;
  total: number;
}

interface props {
  productos: Producto[];

  setProductos: (lista: Producto[] | any) => void;
}

export function CotizacionConcreto(props: props) {
  //const [productos, setProductos] = useState<Producto[]>([]);
  const { productos, setProductos } = props;
  const [productosLista, setProductosLista] = useState([]);
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const data = await Productos.getAll();
        setProductosLista(data);
      } catch (error) {
        console.error("Error al cargar productos:", error);
      }
    };
    fetchProductos();
  }, []);

  const agregarProducto = () => {
    setProductos([
      ...productos,
      {
        item: productos.length + 1,
        unidad: "",
        cantidad: "",
        descripcion: "",
        resistencia: "",
        precio: "",
        total: 0,
      },
    ]);
  };

  const handleChange = (
    index: number,
    field: keyof Producto,
    value: string,
  ) => {
    setProductos((prev: any) => {
      const copia = [...prev];
      if (field === "cantidad" || field === "precio") {
        copia[index][field] = value; // sigue siendo string
        const cantidad = parseFloat(copia[index].cantidad) || 0;
        const precio = parseFloat(copia[index].precio) || 0;
        copia[index].total = cantidad * precio;
      } else {
        // Otros campos son string
        copia[index][field] = value as never;
      }
      return copia;
    });
  };

  const eliminarProducto = (index: number) => {
    const nuevaLista = productos.filter((_, i) => i !== index);
    nuevaLista.forEach((p, i) => (p.item = i + 1));
    setProductos(nuevaLista);
  };

  return (
    <div className="flex flex-col h-full w-full p-4 space-y-4">
      <div className="flex-1 min-h-0 overflow-y-auto pr-2">
        <Accordion alwaysOpen>
          {productos.map((prod, index) => (
            <AccordionPanel key={index}>
              <AccordionTitle className="bg-white">
                Producto #{prod.item} — {prod.descripcion || "Sin descripción"}
              </AccordionTitle>
              <AccordionContent>
                <Card className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Unidad</Label>
                      <Select
                        value={prod.unidad}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                          handleChange(index, "unidad", e.target.value)
                        }
                      >
                        <option value="">Seleccione</option>
                        <option value="UND">UND</option>
                        <option value="M2">M2</option>
                        <option value="M3">M3</option>
                        <option value="M">Metro</option>
                        <option value="KG">KG</option>
                      </Select>
                    </div>

                    <div>
                      <Label>Cantidad</Label>
                      <TextInput
                        type="number"
                        min="0"
                        value={prod.cantidad}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChange(index, "cantidad", e.target.value)
                        }
                      />
                    </div>

                    <div className="md:col-span-2">
                      <Label>Descripción</Label>
                      <TextInput
                        value={prod.descripcion}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChange(index, "descripcion", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <Label>Precio $</Label>
                      <TextInput
                        type="number"
                        min="0"
                        value={prod.precio}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChange(index, "precio", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label>Resistencia</Label>
                      <TextInput
                        value={prod.resistencia}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleChange(index, "resistencia", e.target.value)
                        }
                      />
                    </div>

                    <div>
                      <Label>Total $</Label>
                      <TextInput readOnly value={prod.total} />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      color="failure"
                      onClick={() => eliminarProducto(index)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </Card>
              </AccordionContent>
            </AccordionPanel>
          ))}
        </Accordion>
      </div>

      <div className="flex justify-center pt-2 border-t border-white/10">
        <Button
          onClick={agregarProducto}
          className="bg-yellow-400 hover:bg-yellow-500 text-white"
        >
          Agregar Producto
        </Button>
      </div>
    </div>
  );
}
