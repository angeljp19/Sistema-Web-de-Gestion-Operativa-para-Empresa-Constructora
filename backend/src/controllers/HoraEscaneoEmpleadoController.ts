import { Request, Response } from "express";
import HoraEscaneoEmpleados from "../models/HoraEscaneoEmpleados";
import Empleado from "../models/Empleados";

class HoraEscaneoEmpleadosController {
  static async getAll(req: Request, res: Response) {
    try {
      const horas = await HoraEscaneoEmpleados.findAll({attributes: {exclude:["id", "empleado_id"]}, order: [["fechaHora", "DESC"]],
        include: [
          {
            model: Empleado,
            as: "Empleado",
            attributes: ["nombre", "apellido", "cedula"],
          },
        ],
      });

      return res.json(horas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const hora = await HoraEscaneoEmpleados.findByPk(id);

      if (!hora) {
        return res.status(404).json({ message: "Hora escaneada no encontrada" });
      }

      return res.json(hora);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al obtener la hora escaneada" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { empleado_id, motivo } = req.body;

      if (!empleado_id || !motivo) {
        return res
          .status(400)
          .json({ message: "Todos los campos son obligatorios" });
      }

      const hora = await HoraEscaneoEmpleados.create({
       empleado_id, motivo
      });

      return res
        .status(201)
        .json({ message: "Se registrado correctamente", id: hora.id });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Error al registrar", error: error.message });
    }
  }
}

export default HoraEscaneoEmpleadosController;
