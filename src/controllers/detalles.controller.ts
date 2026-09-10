import type { Request, Response } from "express";
import { detallesModels } from "../models/detalleservice.models";
import { prisma } from "../config/prisma";

export const getall = async (req: Request, res: Response): Promise<void> => {
  /* 
#swagger.tags = ['Detalle de Servicio']
#swagger.summary = Obtiene todas los Detalles de Servicio

*/
  try {
    const resultado = await detallesModels.findall();
    console.log("entro aqui1");
    res.json({ data: resultado });
  } catch (error) {
    res.status(500).json({ error: "hubo un erro al encontrar a los detalles" });
  }
};
export const update = async (req: Request, res: Response): Promise<void> => {
  /* 
#swagger.tags = ['Detalle de Servicio']
#swagger.summary = Actualiza un Detalle de Servicio segun el id
#swagger.parameter['id'] = {
in:'path',
description: 'Id del Detalle de Servicio',
required: true,
type: 'integer'
}
#swagger.requestBody = {
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          cantidad: { type: 'number', example: 10 }
        },
        required: ['cantidad']
      }
    }
  }
}
*/
  try {
    const id = Number(req.params.id);
    const { cantidad } = req.body;
    if (isNaN(id)) {
      res.status(400).json({ error: "el id tiene que ser un numero" });
      return;
    }
    const encontrar = await prisma.detalleServicio.findFirst({
      where: { id: id },
    });
    if (!encontrar) {
      res.status(400).json({ menssage: "este detalle no existe" });
      return;
    }
    if (cantidad === undefined || isNaN(Number(cantidad))) {
      res.status(400).json({ error: "La cantidad debe ser un número válido" });
      return;
    }
    const cantidadNum = Number(cantidad);
    const updatedetalle = await detallesModels.updatedetalle(id, cantidadNum);
    res.status(200).json({ data: { updatedetalle } });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error al intentar actulizar la cantidad" });
  }
};
export const delte = async (req: Request, res: Response): Promise<void> => {
  /* 
#swagger.tags = ['Detalle de Servicio']
#swagger.summary = Elimina un Detalle de Servicio segun el id 
#swagger.parameter['id'] = {
in:'path',
description: 'Id del Detalle de Servicio',
required: true,
type: 'integer'
}

*/

  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res
        .status(400)
        .json({ error: "el id del detalle tiene que ser un numero" });
      return;
    }
    const encontrado = await prisma.detalleServicio.findUnique({
      where: { id: id },
    });
    if (!encontrado) {
      res.status(400).json({ message: "el detalle no existe" });
      return;
    }
    const resultado = await detallesModels.deletedetalle(id);
    res.status(200).json({ message: "se elimino con exito" });
  } catch (error) {
    res.status(500).json({ message: "hubo un error al elminar el detalle" });
  }
};
export const createdetalle = async (
  req: Request,
  res: Response,
): Promise<void> => {
  /* 
#swagger.tags = ['Detalle de Servicio']
#swagger.summary = Crea un nuevo detalle de servicio 
#swagger.requestBody = {
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          cantidad: { type: 'number', example: 2 },
          idOrdenServicio: { type: 'number', example: 1 },
          idRepuesto: { type: 'number', example: 1 }
        },
        required: ['cantidad', 'idOrdenServicio', 'idRepuesto']
      }
    }
  }
}
*/

  try {
    const { cantidad, idOrdenServicio, idRepuesto } = req.body;
    console.log(req.body);
    if (!cantidad || !idOrdenServicio || !idRepuesto) {
      res.status(400).json({ error: "todos los campos son oblidatorios" });
      return;
    }
    const resultado = await detallesModels.creardetalle(
      cantidad,
      idOrdenServicio,
      idRepuesto,
    );
    res.status(200).json({ data: resultado });
  } catch (error:any) {
    res.status(500).json({ message: error });
  }
};
