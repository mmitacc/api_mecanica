import { Router } from "express";
import { validate } from "../middlewares/validateSchema.middleware";
import { repuestoIdSchema, repuestoSchema, repuestoUpdateSchema } from "../schemas/repuesto.schema";
import {
  getRepuestos,
  getRepuesto,
  postRepuesto,
  putRepuesto,
  deleteRepuesto,
} from "../controllers/repuesto.controller";

import { authorize } from "../middlewares/authorize.middleware";

const router = Router();

router.get(
  "/",
  authorize("DUEÑO"),
  getRepuestos,
  /*
    #swagger.tags = ['Repuesto']
    #swagger.summary = 'Obtener todos los repuestos'
    #swagger.description = 'Trae la lista de los repuestos'
  */
);

router.get(
  "/:id",
  authorize("DUEÑO"),
  validate(repuestoIdSchema, "params"),
  getRepuesto,
  /*
    #swagger.tags = ['Repuesto']
    #swagger.summary = 'Obtener un repuesto'
    #swagger.description = 'Retorna un repuesto por su id'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      example: 1
    }
  */
);

router.post(
  "/",
  authorize("DUEÑO"),
  validate(repuestoSchema),
  postRepuesto,
  /*
    #swagger.tags = ['Repuesto']
    #swagger.summary = 'Crear un repuesto'
    #swagger.description = 'Crea un nuevo repuesto'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          example: {
            nombre: "Filtro de aceite",
            precio_unid: 2500,
            stock: 10
          }
        }
      }
    }
  */
);

router.put(
  "/:id",
  authorize("DUEÑO"),
  validate(repuestoIdSchema, "params"),
  validate(repuestoUpdateSchema),
  putRepuesto,
  /*
    #swagger.tags = ['Repuesto']
    #swagger.summary = 'Actualizar un repuesto'
    #swagger.description = 'Actualiza un repuesto existente'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      example: 1
    }
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          example: {
            nombre: "Filtro de aire",
            precio_unid: 3000,
            stock: 8
          }
        }
      }
    }
  */
);

router.delete(
  "/:id",
  authorize("DUEÑO"),
  validate(repuestoIdSchema, "params"),
  deleteRepuesto,
  /*
    #swagger.tags = ['Repuesto']
    #swagger.summary = 'Eliminar un repuesto'
    #swagger.description = 'Elimina un repuesto existente'
    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      example: 1
    }
  */
);

export default router;