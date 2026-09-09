import type { Request, Response } from "express";
import { UsuarioModel } from "../models/usuario.mode";

export const getUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await UsuarioModel.getAll();
    return res.status(200).json({ data: usuarios });
  } catch (error) {
    console.log(error);
  }
};

export const postUsuario = async (req: Request, res: Response) => {
  try {
    const { nombres, apellidos, email, password, role } = req.body;
    if (!nombres || !apellidos || !email || !password || !role) {
      return res.status(400).json({ message: "faltan campos obligatorios" });
    }
    const usuario = await UsuarioModel.crear({
      nombres,
      apellidos,
      email,
      password,
      role,
    });
    return res
      .status(201)
      .json({ message: "usuario creado con exito", data: usuario });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
