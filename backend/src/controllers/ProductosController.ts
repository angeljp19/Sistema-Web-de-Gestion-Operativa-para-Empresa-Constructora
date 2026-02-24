import { Request, Response } from "express";
import Producto from "../models/Productos";

class ProductoController {
  static async getAll(req: Request, res: Response) {
    try {
      const productos = await Producto.findAll({});
      return res.json(productos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al obtener los productos" });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const producto = await Producto.findByPk(id);

      if (!producto) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      return res.json(producto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al obtener el producto" });
    }
  }

  static async create(req: Request, res: Response) {
    try {
      const { nombre } = req.body;

      if (!nombre) {
        return res.status(400).json({ message: "El nombre es obligatorio" });
      }

      const producto = await Producto.create({ nombre });

      return res
        .status(201)
        .json({ message: "Producto creado correctamente", id: producto.id });
    } catch (error: any) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error al crear producto", error: error.message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nombre } = req.body;

      const producto = await Producto.findByPk(id);
      if (!producto) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      producto.nombre = nombre ?? producto.nombre;
      await producto.save();

      return res.json({ message: "Producto actualizado correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al actualizar producto" });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const producto = await Producto.findByPk(id);
      if (!producto) {
        return res.status(404).json({ message: "Producto no encontrado" });
      }

      await producto.destroy();

      return res.json({ message: "Producto eliminado correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al eliminar producto" });
    }
  }
}

export default ProductoController;
