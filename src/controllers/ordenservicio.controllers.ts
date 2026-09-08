import type { Request, Response } from "express";
import { OrdenModel } from "../models/ordenservicio.model";

export const getOrden = async (req: Request, res: Response) => {
  try {
    const orden = await OrdenModel.getAll();
    return res.status(200).json({ data: orden });
  } catch (error) {
    console.log(error);
  }
};

export const postOrden = async (req: Request, res: Response) => {
  try {
    const { descripcion, id_usuario, id_vehiculo } = req.body;
    if (!id_usuario || !descripcion || !id_vehiculo ) {
      return res.status(400).json({ message: "faltan campos obligatorios" });
    }
    const ticket = await OrdenModel.crear({
      descripcion,
      id_usuario,
      id_vehiculo,
    });
    return res
      .status(201)
      .json({ message: "orden creada con exito", data: ticket });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const UpdateOrden = async (req: Request, res: Response) => {
  try {
    const { costo_mecanico, estado, total } = req.body;
    const id = Number(req.params.id);
    if (!estado || !costo_mecanico || !id || total) {
      return res.status(400).json({ message: "faltan campos obligatorios" });
    }
    const ticket = await OrdenModel.update({ costo_mecanico, estado, total}, id);
    return res
      .status(200)
      .json({ message: "orden actualizado con exito", data: ticket });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};