import type { Request, Response } from "express";
import { UsuarioModel } from "../models/usuario.mode";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await UsuarioModel.getAll();
    return res.status(200).json({ total: usuarios.length, data: usuarios });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const registerUsuario = async (req: Request, res: Response) => {
  try {
    const { nombres, apellidos, email, password, role } = req.body;
    if (!nombres || !apellidos || !email || !password || !role) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const usuario = await UsuarioModel.create({
      nombres,
      apellidos,
      email,
      password: hashedPassword,
      role,
    });
    return res
      .status(201)
      .json({ message: "Usuario registrado correctamente.", data: usuario });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }
    const usuario = await UsuarioModel.findEmail(email);
    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        role: usuario.role,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "8h" },
    );
    res
      .status(200)
      .json({ message: "Token generado exitosamente", token: token });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "El ID debe ser un número entero" });
    }
    const usuario = await UsuarioModel.findId(id);
    if (!usuario) {
      return res.status(404).json({ error: "El ID de usuario no existe" });
    }
    return res
      .status(200)
      .json({ message: "Usuario ubicado correctamente", data: usuario });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getMecanico = async (req: Request, res: Response) => {
  try {
    const id = Number(req.user!.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "El ID debe ser un número entero" });
    }
    const usuario = await UsuarioModel.getMecanicoOrden(id);
    if (!usuario || req.user!.role !== "MECANICO") {
      return res
        .status(404)
        .json({ error: "Solo un mecánico puede ver sus ordenes de servicio." });
    }
    return res
      .status(200)
      .json({ message: "Mecanico ubicado correctamente", data: usuario });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const putUsuario = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "El ID debe ser un número entero" });
    }
    const { nombres, apellidos, email, role } = req.body;
    if (!nombres || !apellidos || !email || !role) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }
    const usuario = await UsuarioModel.update(id, {
      nombres,
      apellidos,
      email,
      role,
    });
    return res
      .status(201)
      .json({ message: "Usuario actualizado con exito", data: usuario });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const putUsuarioPassword = async (req: Request, res: Response) => {
  try {
    const id = Number(req.user!.id);
    const { password, email } = req.body;
    if (!password || !email) {
      return res
        .status(404)
        .json({ message: "Faltan campos obligatorios: email y/o password" });
    }
    if (email !== req.user!.email) {
      return res.status(404).json({
        message: "Usuario No tiene permisos para cambiar el password",
      });
    }
    const passwordHash = await bcrypt.hash(password, 10);
    await UsuarioModel.updatePassword(id, passwordHash);
    return res
      .status(200)
      .json({ message: "Password actualizado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "El ID debe ser un número entero" });
    }
    const usuario = await UsuarioModel.delete(id);
    if (!usuario) {
      return res.status(404).json({ error: "El ID de usuario no existe" });
    }
    return res
      .status(200)
      .json({ message: "Usuario eliminado correctamente", data: usuario });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
