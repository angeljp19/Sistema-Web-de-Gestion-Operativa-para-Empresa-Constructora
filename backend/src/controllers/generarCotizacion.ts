import ExcelJS from "exceljs";
import path from "path";

export async function generarCotizacionConcreto(form: any, productos: any) {
  const templatePath = path.join(
    __dirname,
    "../templates/cotizacionConcreto.xlsx"
  );

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(templatePath);
  const sheet = workbook.getWorksheet("Hoja1");

  // 📝 Rellenar campos del formulario
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

  // 🧾 Productos (empiezan en la fila 17 por ejemplo)
  let fila = 14;

  productos.forEach((p: any) => {
    const columnas = ["A", "B", "C", "D", "E", "F", "G"];

    // Llenar datos
    sheet!.getCell(`A${fila}`).value = fila - 17; // item interno
    sheet!.getCell(`B${fila}`).value = p.unidad;
    sheet!.getCell(`C${fila}`).value = p.cantidad;
    sheet!.getCell(`D${fila}`).value = p.descripcion;
    sheet!.getCell(`E${fila}`).value = p.resistencia;
    sheet!.getCell(`F${fila}`).value = p.precio;
    sheet!.getCell(`G${fila}`).value = p.total;

    // Aplicar estilo a todas las columnas de esa fila
    columnas.forEach((col) => {
      const cell = sheet!.getCell(`${col}${fila}`);

      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFD9D9D9" }, // gris claro (Excel usa ARGB)
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

  // 🧮 Totales (ejemplo)
  sheet!.getCell("H32").value = productos.reduce(
    (acc: any, p: any) => acc + p.total,
    0
  );

  // Guardar Excel temporal
  const outputXlsx = path.join(__dirname, "../tmp/cotizacionConcreto.xlsx");
  await workbook.xlsx.writeFile(outputXlsx);
}
export async function generarCotizacionMateriales(form: any, productos: any) {
  const templatePath = path.join(
    __dirname,
    "../templates/cotizacionMateriales.xlsx"
  );

  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(templatePath);
  const sheet = workbook.getWorksheet("Hoja1");

  // 📝 Rellenar campos del formulario
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

  // 🧾 Productos (empiezan en la fila 17 por ejemplo)
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

    // Aplicar estilo a todas las columnas de esa fila
    columnas.forEach((col) => {
      const cell = sheet!.getCell(`${col}${fila}`);

      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFD9D9D9" }, // gris claro (Excel usa ARGB)
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

  // 🧮 Totales (ejemplo)
  sheet!.getCell("H19").value = productos.reduce(
    (acc: any, p: any) => acc + p.total,
    0
  );

  // Guardar Excel temporal
  const outputXlsx = path.join(__dirname, "../tmp/cotizacion.xlsx");
  await workbook.xlsx.writeFile(outputXlsx);
}
