import type { Request, Response } from "express";

import { RepuestoModel } from "../models/respuesto.model";

export const getRepuestos = async (req: Request, res: Response) => {
  try {
    const repuestos = await RepuestoModel.getAll();

    return res.status(200).json({
      data: repuestos,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getRepuesto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "El id debe ser un número",
      });
    }

    const repuesto = await RepuestoModel.getById(id);

    if (!repuesto) {
      return res.status(404).json({
        message: "Repuesto no encontrado",
      });
    }

    return res.status(200).json({
      data: repuesto,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const postRepuesto = async (req: Request, res: Response) => {
  try {
    const { nombre, precio_unid, stock } = req.body;

    if ( !nombre || precio_unid === undefined || stock === undefined) {
      return res.status(400).json({
        message: "faltan datos obligatorios",
      });
    }

    if (precio_unid < 0 || stock < 0) {
      return res.status(400).json({
        message: "El precio y el stock no pueden ser números negativos",
      });
    }

    const repuesto = await RepuestoModel.crear({
      nombre,
      precio_unid,
      stock,
    });

    return res.status(201).json({
      message: "repuesto creado con exito",
      data: repuesto,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const putRepuesto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "El id debe ser un número",
      });
    }

    const repuestoExistente = await RepuestoModel.getById(id);

    if (!repuestoExistente) {
      return res.status(404).json({
        message: "Repuesto no encontrado",
      });
    }

    const { nombre, precio_unid, stock } = req.body;

    if ( nombre === undefined && precio_unid === undefined && stock === undefined) {
      return res.status(400).json({
        message: "No se enviaron datos para actualizar",
      });
    }

    if (
      (precio_unid !== undefined && precio_unid < 0) ||
      (stock !== undefined && stock < 0)
    ) {
      return res.status(400).json({
        message: "El precio y el stock no pueden ser valores negativos",
      });
    }

    const repuesto = await RepuestoModel.actualizar(id, {
      nombre,
      precio_unid,
      stock,
    });

    return res.status(200).json({
      message: "repuesto actualizado con exito",
      data: repuesto,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const deleteRepuesto = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        message: "El id debe ser un número",
      });
    }

    const repuestoExistente = await RepuestoModel.getById(id);

    if (!repuestoExistente) {
      return res.status(404).json({
        message: "Repuesto no encontrado",
      });
    }

    const repuesto = await RepuestoModel.eliminar(id);

    return res.status(200).json({
      message: "repuesto eliminado con exito",
      data: repuesto,
    });
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};