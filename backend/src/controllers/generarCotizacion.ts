import ExcelJS from "exceljs";
import path from "path";

// database models
import Cotizacion from "../models/Cotizaciones";
import CotizacionItem from "../models/CotizacionItem";

export async function generarCotizacionConcreto(form: any, productos: any, save = true) {
  const templatePath = path.join(
    __dirname,
    "../../templates/cotizacionConcreto.xlsx",
  );

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(templatePath);
  const sheet = workbook.getWorksheet("Hoja1");

 
  sheet!.getCell("D1").value = form.cliente;
  sheet!.getCell("C2").value = form.rif;
  sheet!.getCell("C5").value = form.telefono;
  sheet!.getCell("C7").value = form.direccion;
  sheet!.getCell("C10").value = form.atencion;

  sheet!.getCell("G3").value = form.cotizacionNum;
  sheet!.getCell("H10").value = form.cotizacionNum;
  sheet!.getCell("H3").value = form.fecha;
  sheet!.getCell("G5").value = form.validezOferta;
  sheet!.getCell("H5").value = form.condicionPago;
  sheet!.getCell("G7").value = form.personaContacto;
  sheet!.getCell("H7").value = form.numeroDirecto;


  let fila = 14;

  productos.forEach((p: any) => {
    const columnas = ["A", "B", "C", "D", "E", "F", "G"];

   
    sheet!.getCell(`A${fila}`).value = fila - 17;
    sheet!.getCell(`B${fila}`).value = p.unidad;
    sheet!.getCell(`C${fila}`).value = p.cantidad;
    sheet!.getCell(`D${fila}`).value = p.descripcion;
    sheet!.getCell(`E${fila}`).value = p.resistencia;
    sheet!.getCell(`F${fila}`).value = p.precio;
    sheet!.getCell(`G${fila}`).value = p.total;

   
    columnas.forEach((col) => {
      const cell = sheet!.getCell(`${col}${fila}`);

      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFD9D9D9" }, 
      };

      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };

      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };

      cell.font = {
        name: "Arial",
        size: 11,
      };
    });

    fila++;
  });


  sheet!.getCell("H32").value = productos.reduce(
    (acc: any, p: any) => acc + p.total,
    0,
  );


  const outputXlsx = path.join(__dirname, "../../tmp/cotizacionConcreto.xlsx");
  await workbook.xlsx.writeFile(outputXlsx);

 
  if (!save) return; // solo generar el Excel sin guardar en DB
  const cotData: any = {
    cliente: form.cliente,
    cedula_rif: form.rif,
    telefono: form.telefono,
    direccion: form.direccion || null,
    atencion: form.atencion || null,
    email: form.email || null,
    cotizacion: form.cotizacionNum,
    fecha: form.fecha || null,
    validezOferta: form.validezOferta || null,
    condicionPago: form.condicionPago || null,
    personaContacto: form.personaContacto || null,
    numDirecto: form.numeroDirecto || null,
  };

  const nueva = await Cotizacion.create(cotData);
  if (productos && productos.length) {
    const items = productos.map((p: any) => ({
      cotizacion_id: nueva.id,
      producto: p.descripcion,
      unidad: p.unidad,
      cantidad: p.cantidad,
      precio: p.precio,
      resistencia: p.resistencia,
    }));

    await CotizacionItem.bulkCreate(items);
  }
}

export async function generarCotizacionMateriales(form: any, productos: any, save = true) {
  const templatePath = path.join(
    __dirname,
    "../../templates/cotizacionMateriales.xlsx",
  );

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(templatePath);
  const sheet = workbook.getWorksheet("Hoja1");

  //  Rellenar campos del formulario
  sheet!.getCell("C1").value = form.cliente;
  sheet!.getCell("C3").value = form.rif;
  sheet!.getCell("C5").value = form.telefono;
  sheet!.getCell("C6").value = form.direccion;
  sheet!.getCell("C9").value = form.atencion;
  sheet!.getCell("C11").value = form.email;

  sheet!.getCell("H3").value = form.cotizacionNum;
  sheet!.getCell("I10").value = form.cotizacionNum;
  sheet!.getCell("I3").value = form.fecha;
  sheet!.getCell("H5").value = form.validezOferta;
  sheet!.getCell("I5").value = form.condicionPago;
  sheet!.getCell("H7").value = form.personaContacto;
  sheet!.getCell("I7").value = form.numeroDirecto;

  //  Productos (empiezan en la fila 17 por ejemplo)
  let fila = 18;

  productos.forEach((p: any) => {
    const columnas = ["A", "B", "C", "D", "E", "F"];

    // Llenar datos
    sheet!.getCell(`A${fila}`).value = fila - 17; // item interno
    sheet!.getCell(`B${fila}`).value = p.unidad;
    sheet!.getCell(`C${fila}`).value = p.cantidad;
    sheet!.getCell(`D${fila}`).value = p.descripcion;
    sheet!.getCell(`E${fila}`).value = p.precio;
    sheet!.getCell(`F${fila}`).value = p.total;

  
    columnas.forEach((col) => {
      const cell = sheet!.getCell(`${col}${fila}`);

      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFD9D9D9" }, 
      };

      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };

      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };

      cell.font = {
        name: "Arial",
        size: 11,
      };
    });

    fila++;
  });


  sheet!.getCell("H19").value = productos.reduce(
    (acc: any, p: any) => acc + p.total,
    0,
  );

 
  const outputXlsx = path.join(__dirname, "../../tmp/cotizacion.xlsx");
  await workbook.xlsx.writeFile(outputXlsx);

  if (!save) return; // si solo queremos generar el Excel sin guardar en DB

  // ── Guardar cotización en la base de datos ──────────────────────────────
  const cotData: any = {
    cliente: form.cliente,
    cedula_rif: form.rif,
    telefono: form.telefono,
    direccion: form.direccion || null,
    atencion: form.atencion || null,
    email: form.email || null,
    cotizacion: form.cotizacionNum,
    fecha: form.fecha || null,
    validezOferta: form.validezOferta || null,
    condicionPago: form.condicionPago || null,
    personaContacto: form.personaContacto || null,
    numDirecto: form.numeroDirecto || null,
  };

  const nueva = await Cotizacion.create(cotData);
  if (productos && productos.length) {
    const items = productos.map((p: any) => ({
      cotizacion_id: nueva.id,
      producto: p.descripcion,
      unidad: p.unidad,
      cantidad: p.cantidad,
      precio: p.precio,
    }));

    await CotizacionItem.bulkCreate(items);
  }
}

export async function getCotizacion(id: number) {
 
  const cot = await Cotizacion.findByPk(id);
  if (!cot) {
    throw new Error("Cotización no encontrada");
  }


  const items = await CotizacionItem.findAll({
    where: { cotizacion_id: id },
  });


  const form: any = {
    cliente: cot.cliente,
    rif: cot.cedula_rif,
    telefono: cot.telefono,
    direccion: cot.direccion,
    atencion: cot.atencion,
    email: cot.email,
    cotizacionNum: cot.cotizacion,
    fecha: cot.fecha,
    validezOferta: cot.validezOferta,
    condicionPago: cot.condicionPago,
    personaContacto: cot.personaContacto,
    numeroDirecto: cot.numDirecto,
  };

  const productos = items.map((i: any) => {
    const cantidad = parseFloat(i.cantidad as any) || 0;
    const precio = parseFloat(i.precio as any) || 0;
    return {
      unidad: i.unidad,
      cantidad,
      descripcion: i.producto,
      resistencia: i.resistencia,
      precio,
      total: cantidad * precio,
    };
  });


  const hasResistencia = productos.some(
    (p: any) =>
      p.resistencia !== null &&
      p.resistencia !== undefined &&
      p.resistencia !== "",
  );

  if (hasResistencia) {
    await generarCotizacionConcreto(form, productos, false);
    return path.join(__dirname, "../../tmp/cotizacionConcreto.xlsx");
  } else {
    await generarCotizacionMateriales(form, productos, false);
    return path.join(__dirname, "../../tmp/cotizacion.xlsx");
  }
}

export async function getCotizaciones() {
  const cotizaciones = await Cotizacion.findAll();
  return cotizaciones;
}
