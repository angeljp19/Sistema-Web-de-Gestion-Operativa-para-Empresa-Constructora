import { Request, Response } from "express";
import Empleado from "../models/Empleados";
import Planta from "../models/Plantas";

class EmpleadoController {
  static async getAll(req: Request, res: Response) {
    try {
      const empleados = await Empleado.findAll({where:{"activo": true} , attributes: {exclude:["planta_id"],},
        include: [
          {
            model: Planta,
            as: "planta",
            attributes: ["nombre"],
          },
        ],
      });

      const data = empleados.map((emp: any) => ({
        id: emp.id,
        nombre: emp.nombre,
        apellido: emp.apellido,
        cedula: emp.cedula,
        planta_id: emp.planta_id,
        planta: emp.planta?.nombre || null, 
        activo: emp.activo,
        fecha_creacion: emp.fecha_creacion,
      }));

      return res.json(data);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error al obtener los empleados" });
    }
  }

  // Obtener usuario por ID
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const empleado = await Empleado.findByPk(id, {});

      if (!empleado) {
        return res.status(404).json({ message: "Empleado no encontrado" });
      }

      return res.json(empleado);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al obtener el empleado" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { nombre, apellido, cedula, planta_id } = req.body;

      if (!nombre || !apellido || !cedula || !planta_id) {
        return res
          .status(400)
          .json({ message: "Todos los campos son obligatorios" });
      }

      const empleado = await Empleado.create({
        nombre,
        apellido,
        cedula,
        planta_id,
      });

      return res
        .status(201)
        .json({ message: "Empleado creado correctamente", id: empleado.id });
    } catch (error: any) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error al crear empleado", error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nombre, apellido, cedula, planta_id, activo } = req.body;

      const empleado = await Empleado.findByPk(id);
      if (!empleado) {
        return res.status(404).json({ message: "Empleado no encontrado" });
      }

      empleado.nombre = nombre ?? empleado.nombre;
      empleado.apellido = apellido ?? empleado.apellido;
      empleado.cedula = cedula ?? empleado.cedula;
      empleado.planta_id = planta_id ?? empleado.planta_id;
      empleado.activo = activo ?? empleado.activo;

      await empleado.save();

      return res.json({ message: "Empleado actualizado correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al actualizar empleado" });
    }
  }

  // Eliminar usuario
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const empleado = await Empleado.findByPk(id);
      if (!empleado) {
        return res.status(404).json({ message: "Empleado no encontrado" });
      }

      await empleado.destroy();

      return res.json({ message: "Empleado eliminado correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al eliminar empleado" });
    }
  }
}

export default EmpleadoController;
