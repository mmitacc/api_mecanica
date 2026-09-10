import { Router } from "express";
import { validate } from "../middlewares/validateSchema.middleware";
import { crearClienteSchema } from "../schemas/cliente.schema";
import { actualizarClienteSchema } from "../schemas/cliente.schema";

import { authorize } from "../middlewares/authorize.middleware";

import {
  getClientes,
  getClientePorId,
  postCliente,
  putCliente,
} from "../controllers/cliente.controller";

const router: Router = Router();

router.get(
  "/",
  authorize("RECEPCIONISTA", "DUEÑO"),
  getClientes,
  /*
    #swagger.tags = ['Clientes']
    #swagger.summary = 'Obtener todos los clientes'
    #swagger.description = 'Obtiene la lista de todos los clientes registrados.'
  */
);

router.get(
  "/:id",
  authorize("RECEPCIONISTA", "DUEÑO"),
  getClientePorId,
  /*
    #swagger.tags = ['Clientes']
    #swagger.summary = 'Obtener un cliente por ID'
    #swagger.description = 'Obtiene los datos de un cliente específico.'

    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: 'ID del cliente'
    }
  */
);

router.post(
  "/",
  authorize("RECEPCIONISTA", "DUEÑO"),
  validate(crearClienteSchema),
  postCliente,
  /*
    #swagger.tags = ['Clientes']
    #swagger.summary = 'Crear un cliente'
    #swagger.description = 'Registra un nuevo cliente.'
    
    #swagger.requestBody = {
        description: 'Registra un nuevo cliente',
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {                
                      "nombres": {type: 'string', example: "Juan Carlos"},
                      "apellidos": {type: 'string', example: "Perez"},
                      "email": {type: 'string', example: "juan@gmail.com"},
                    }
                }
            }
        }
    }   
  */
);

router.put(
  "/:id",
  authorize("RECEPCIONISTA", "DUEÑO"),
  validate(actualizarClienteSchema),
  putCliente,
  /*
    #swagger.tags = ['Clientes']
    #swagger.summary = 'Actualizar un cliente'
    #swagger.description = 'Actualiza los datos de un cliente existente.'

    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: 'ID del cliente'
    }

    #swagger.requestBody = {
        description: 'Registra un nuevo cliente',
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {                
                      "nombres": {type: 'string', example: "Juan Carlos"},
                      "apellidos": {type: 'string', example: "Perez"},
                      "email": {type: 'string', example: "juan@gmail.com"},
                    }
                }
            }
        }
    }  
  */
);

export default router;
