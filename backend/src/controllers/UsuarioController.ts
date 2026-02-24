import { Request, Response } from "express";
import Usuario from "../models/Usuario";
import bcrypt from "bcrypt";

class UsuarioController {
  static async getAll(req: Request, res: Response) {
    try {
      const usuarios = await Usuario.findAll({
        attributes: { exclude: ["password"] },
        
      });

      return res.json(usuarios);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al obtener los usuarios" });
    }
  }

  // Obtener usuario por ID
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByPk(id, {
        attributes: { exclude: ["password"] },
      });

      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      return res.json(usuario);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al obtener el usuario" });
    }
  }

  // Crear usuario con hash de contraseña
  static async create(req: Request, res: Response) {
    console.log(req.body)
    try {
      const { nombre, apellido, cedula, email, password} =
        req.body;

      if (
        !nombre ||
        !apellido ||
        !cedula ||
        !email ||
        !password 
      ) {
        return res
          .status(400)
          .json({ message: "Todos los campos son obligatorios" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const usuario = await Usuario.create({
        nombre,
        apellido,
        cedula,
        email,
        password: hashedPassword,
      });

      return res
        .status(201)
        .json({ message: "Usuario creado correctamente", id: usuario.id });
    } catch (error: any) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error al crear usuario", error: error.message });
    }
  }

  // Actualizar usuario (si envía password → la hasheamos)
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        nombre,
        apellido,
        cedula,
        email,
        password,
        activo,
      } = req.body;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      usuario.nombre = nombre ?? usuario.nombre;
      usuario.apellido = apellido ?? usuario.apellido;
      usuario.cedula = cedula ?? usuario.apellido
      usuario.email = email ?? usuario.email;
      usuario.activo = activo ?? usuario.activo;

      if (password) {
        usuario.password = await bcrypt.hash(password, 10);
      }

      await usuario.save();

      return res.json({ message: "Usuario actualizado correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al actualizar usuario" });
    }
  }

  // Eliminar usuario
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      await usuario.destroy();

      return res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error al eliminar usuario" });
    }
  }
}

export default UsuarioController;
