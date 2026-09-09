import type { Request, Response } from "express";

import { ClienteModel } from "../models/cliente.model";

export const getClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await ClienteModel.getAll();

    return res.status(200).json({
      data: clientes,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error al obtener los clientes",
    });
  }
};

export const getClientePorId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "El ID debe ser un número",
      });
    }

    const cliente = await ClienteModel.getById(id);

    if (!cliente) {
      return res.status(404).json({
        message: "Cliente no encontrado",
      });
    }

    return res.status(200).json({
      data: cliente,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Error al obtener el cliente",
    });
  }
};

export const postCliente = async (req: Request, res: Response) => {
  try {
    const { nombres, apellidos, email } = req.body;
    if (
      typeof nombres !== "string" ||
      typeof apellidos !== "string" ||
      typeof email !== "string"
    ) {
      return res
        .status(400)
        .json({ message: "Los nombres, apellidos y email deben ser texto" });
    }
    const nombresLimpios = nombres.trim();
    const apellidosLimpios = apellidos.trim();
    const emailLimpio = email.trim();
    if (!nombresLimpios || !apellidosLimpios || !emailLimpio) {
      return res
        .status(400)
        .json({ message: "Los campos no pueden estar vacíos" });
    }
    if (!emailLimpio.includes("@")) {
      return res
        .status(400)
        .json({ message: "El email no tiene un formato válido" });
    }
    const cliente = await ClienteModel.crear({
      nombres: nombresLimpios,
      apellidos: apellidosLimpios,
      email: emailLimpio,
    });
    return res
      .status(201)
      .json({ message: "Cliente creado con éxito", data: cliente });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al crear el cliente" });
  }
};
export const putCliente = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res
        .status(400)
        .json({ message: "El ID debe ser un número entero mayor que 0" });
    }
    const { nombres, apellidos, email } = req.body;
    if (
      typeof nombres !== "string" ||
      typeof apellidos !== "string" ||
      typeof email !== "string"
    ) {
      return res
        .status(400)
        .json({ message: "Los nombres, apellidos y email deben ser texto" });
    }
    const nombresLimpios = nombres.trim();
    const apellidosLimpios = apellidos.trim();
    const emailLimpio = email.trim();
    if (!nombresLimpios || !apellidosLimpios || !emailLimpio) {
      return res
        .status(400)
        .json({ message: "Los campos no pueden estar vacíos" });
    }
    if (!emailLimpio.includes("@")) {
      return res
        .status(400)
        .json({ message: "El email no tiene un formato válido" });
    }
    const cliente = await ClienteModel.actualizar(id, {
      nombres: nombresLimpios,
      apellidos: apellidosLimpios,
      email: emailLimpio,
    });
    return res
      .status(200)
      .json({ message: "Cliente actualizado con éxito", data: cliente });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error al actualizar el cliente" });
  }
};
