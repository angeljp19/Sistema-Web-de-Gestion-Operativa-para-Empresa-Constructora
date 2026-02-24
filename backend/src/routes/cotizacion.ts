import express from "express";
import { generarCotizacionMateriales, generarCotizacionConcreto } from "../controllers/generarCotizacion";
import fs from "fs";
import path from "path";

const router = express.Router();

router.post("/cotizacionMateriales", async (req, res) => {
  const { form, productos } = req.body;
   const filePath = path.join(__dirname, "../tmp/cotizacion.xlsx");

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
   const filePath = path.join(__dirname, "../tmp/cotizacionConcreto.xlsx");

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

export default router;
