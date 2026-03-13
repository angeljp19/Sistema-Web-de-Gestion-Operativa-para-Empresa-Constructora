import express from "express";
import { generarCotizacionMateriales, generarCotizacionConcreto, getCotizaciones, getCotizacion } from "../controllers/generarCotizacion";
import fs from "fs";
import path from "path";

const router = express.Router();

router.post("/cotizacionMateriales", async (req, res) => {
  const { form, productos } = req.body;
   const filePath = path.join(__dirname, "../../tmp/cotizacion.xlsx");

  try {
    await generarCotizacionMateriales(form, productos); // tu función que llena la plantilla

    return res.download(filePath, "cotizacion.xlsx", (err) => {
      if (err) {
        console.error("Error enviando archivo:", err);
        res.status(500).json({ error: "Error al enviar archivo" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generando cotización" });
  }
});
router.post("/cotizacionConcreto", async (req, res) => {
  const { form, productos } = req.body;
   const filePath = path.join(__dirname, "../../tmp/cotizacionConcreto.xlsx");

  try {
    await generarCotizacionConcreto(form, productos); // tu función que llena la plantilla

    return res.download(filePath, "cotizacionConcreto.xlsx", (err) => {
      if (err) {
        console.error("Error enviando archivo:", err);
        res.status(500).json({ error: "Error al enviar archivo" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generando cotización" });
  }
});
// obtener un listado de todas las cotizaciones
router.get("/", async (req, res) => {
  try{
    const cotizaciones = await getCotizaciones();
    res.json(cotizaciones);
  }catch(error){
    res.status(500).json({ error: "Error obteniendo cotizaciones" });
  }
});

// regenera y descarga una cotización existente por id
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const filePath = await getCotizacion(id);
    return res.download(filePath, path.basename(filePath), (err) => {
      if (err) {
        console.error("Error enviando archivo:", err);
        res.status(500).json({ error: "Error al enviar archivo" });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error regenerando cotización" });
  }
});

export default router;
