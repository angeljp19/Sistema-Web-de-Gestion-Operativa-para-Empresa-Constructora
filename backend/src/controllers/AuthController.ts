import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario"; 
import RecuperarContrasena from "../models/RecuperarContraseña";
import { sendEmail } from "../services/mailService/mailService";
import { Op } from "sequelize";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };

    if (!email || !password) {
      return res.status(400).json({ message: "Email y password son requeridos" });
    }

    const usuario = await Usuario.findOne({
      where: { email, activo: true },

    });

    if (!usuario) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const passOk = await bcrypt.compare(password, usuario.password);
    if (!passOk) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }


    const payload = {
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      cedula: usuario.cedula,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1d"
    });
  
    return res.status(200).json({
      message: "Login exitoso",
      token,
      user: payload,
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error interno" });
  }
};

export const recuperarContraseña = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const usuario = await Usuario.findOne({
      where: {
        email: email,
      },
    });

    if (!usuario) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const codigo =
      Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
    const hashCodigo = await bcrypt.hash(String(codigo), 3);
    await RecuperarContrasena.update(
      { usado: true },
      {
        where: {
          usuario_id: usuario.id,
        },
      },
    );
    await RecuperarContrasena.create({
      usuario_id: usuario.id,
      token_hash: hashCodigo,
    });

    sendEmail({
      to: usuario.email,
      subject: "Olvido de contraseña",
      text: `Tu codigo de recuperación de contraseña es: "${codigo}". Este codigo tiene un tiempo de vencimiento de 10 minutos y un uso unico.`,
    });

    return res.status(200).json({ message: "ok" });
  } catch (error) {
    return res.status(401).json(error);
  }
};

export const validarCodigo = async (req: Request, res: Response) => {
  try {
    const { email, codigo, password } = req.body;

    const usuario = await Usuario.findOne({
      where: {
        email: email,
      },
    });

    if (!usuario) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const code = await RecuperarContrasena.findOne({
      where: {
        usuario_id: usuario.id,
        usado: false,
        fecha_expiracion: {
          [Op.gt]: new Date(),
        },
      },
    });

    if (!code) {
      return res
        .status(401)
        .json({ message: "Codigo expirado" });
    }

    const passOk = await bcrypt.compare(codigo, code.token_hash);
    if (!passOk) {
      return res
        .status(401)
        .json({ message: "Codigo de autentificacion incorrecto" });
    }

    await RecuperarContrasena.update({usado: true}, {where:{
      id: code.id
    }})

    const hashedPassword = await bcrypt.hash(password, 10);

    await Usuario.update(
      { password: hashedPassword },
      {
        where: {
          id: usuario.id,
        },
      },
    );

    return res.status(200).json({ message: "ok" });
  } catch (error) {
    return res.status(401).json(error);
  }
};
