import type { Request, Response } from "express";
import { OrdenModel } from "../models/ordenservicio.model";
import { getReporte } from "../services/ordenservicio.service";

export const getOrden = async (req: Request, res: Response) => {
  /* 
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.tags = ["Orden de Servicio"]
    #swagger.summary = "ver a todas las Ordenes de Servicio"
    #swagger.description= "Permite visualizar el listado de todas las Ordenes de Servicio"
  */
  try {
    const orden = await OrdenModel.getAll();
    return res.status(200).json({ data: orden });
  } catch (error) {
    console.log(error);
  }
};

export const postOrden = async (req: Request, res: Response) => {
  /* 
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.tags = ["Orden de Servicio"]
    #swagger.summary = "Un recepcionista o dueño pueden crear una Orden de Servicio"
    #swagger.description= "Permite la creacion de una Orden de Servicio"
     #swagger.requestBody ={
      required:true,
      schema:{
        $ref:"#/components/schemas/ordenservicioDTO"
      }
    }
  */
  try {
    const { descripcion, idUsuario, idVehiculo } = req.body;
    if (!idUsuario || !descripcion || !idVehiculo ) {
      return res.status(400).json({ message: "faltan campos obligatorios" });
    }
    const ticket = await OrdenModel.crear({
      descripcion,
      idUsuario,
      idVehiculo,
    });
    return res
      .status(201)
      .json({ message: "orden creada con exito", data: ticket });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const UpdateOrden = async (req: Request, res: Response) => {
  /* 
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.tags = ["Orden de Servicio"]
    #swagger.summary = "Un mecanico o dueño puede cambia el estado de una Orden de Servicio"
    #swagger.description= "Permite la actualizacion del estado de una Orden de Servicio"
     #swagger.requestBody ={
      required:true,
      schema:{
        $ref:"#/components/schemas/ordenservicioUpdateDTO"
      }
    }
  */
  try {
    const { costo_mecanico, estado, total } = req.body;
    const id = Number(req.params.id);
    if (!estado || !costo_mecanico || !id || total) {
      return res.status(400).json({ message: "faltan campos obligatorios" });
    }
    const fechacreacion = new Date()
    const orden = await OrdenModel.update({ costo_mecanico, estado, total, fechacreacion}, id);
    return res
      .status(200)
      .json({ message: "orden actualizado con exito", data: orden });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const getReporteFecha = async (req: Request, res: Response) => {
  /* 
    #swagger.security = [{ "bearerAuth": [] }]
    #swagger.tags = ["Orden de Servicio"]
    #swagger.summary = "Genera un reporte de Ordenes Servicio y muestra el monto total de respuestos y de ganancias"
    #swagger.description= "Reporte de Ordenes Servicio"
     #swagger.requestBody ={
      required:true,
      schema:{
        $ref:"#/components/schemas/ordenservicioReporteDTO"
      }
    }
  */
  try {
    let minFecha = String(req.query.minFecha)
    let maxFecha = String(req.query.maxFecha)
    const citas = await getReporte(minFecha,maxFecha)
    res.json(citas)
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

