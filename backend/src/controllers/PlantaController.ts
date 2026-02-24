import { Request, Response } from "express";
import Planta from "../models/Plantas";

class PlantaController {
  static async getAll(req: Request, res: Response) {
    try {
      const plantas = await Planta.findAll({});

      return res.json(plantas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al obtener las plantas" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const planta = await Planta.findByPk(id);

      if (!planta) {
        return res.status(404).json({ message: "Planta no encontrada" });
      }

      return res.json(planta);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al obtener la planta" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { nombre, ubicacion } = req.body;

      if (!nombre || !ubicacion) {
        return res
          .status(400)
          .json({ message: "Todos los campos son obligatorios" });
      }

      const planta = await Planta.create({
        nombre,
        ubicacion,
      });

      return res
        .status(201)
        .json({ message: "Planta creada correctamente", id: planta.id });
    } catch (error: any) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error al crear planta", error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nombre, ubicacion } = req.body;

      const planta = await Planta.findByPk(id);
      if (!planta) {
        return res.status(404).json({ message: "Planta no encontrada" });
      }

      planta.nombre = nombre ?? planta.nombre;
      planta.ubicacion = ubicacion ?? planta.ubicacion;

      await planta.save();

      return res.json({ message: "Planta actualizada correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al actualizar planta" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const planta = await Planta.findByPk(id);
      if (!planta) {
        return res.status(404).json({ message: "Planta no encontrada" });
      }

      await planta.destroy();

      return res.json({ message: "Planta eliminada correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al eliminar planta" });
    }
  }
}

export default PlantaController;
