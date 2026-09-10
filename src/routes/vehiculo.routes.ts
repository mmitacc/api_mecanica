import { Router } from "express";
import { validate } from "../middlewares/validateSchema.middleware";
import { crearVehiculoSchema } from "../schemas/vehiculo.schema";
import { actualizarVehiculoSchema } from "../schemas/vehiculo.schema";

import {
  getVehiculos,
  getVehiculoPorId,
  postVehiculo,
  putVehiculo,
} from "../controllers/vehiculo.controller";

import { authorize } from "../middlewares/authorize.middleware";

const router: Router = Router();

router.get(
  "/",
  authorize("RECEPCIONISTA", "DUEÑO"),
  getVehiculos,
  /*
    #swagger.tags = ['Vehículos']
    #swagger.summary = 'Obtener todos los vehículos'
    #swagger.description = 'Obtiene la lista de todos los vehículos registrados.'
  */
);

router.get(
  "/:id",
  authorize("RECEPCIONISTA", "DUEÑO"),
  getVehiculoPorId,
  /*
    #swagger.tags = ['Vehículos']
    #swagger.summary = 'Obtener un vehículo por ID'
    #swagger.description = 'Obtiene los datos de un vehículo específico.'

    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: 'ID del vehículo'
    }
  */
);

router.post(
  "/",
  authorize("RECEPCIONISTA", "DUEÑO"),
  validate(crearVehiculoSchema),
  postVehiculo,
  /*
    #swagger.tags = ['Vehículos']
    #swagger.summary = 'Crear un vehículo'
    #swagger.description = 'Registra un nuevo vehículo asociado a un cliente.'

    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        placa: 'ABC123',
        marca: 'Toyota',
        modelo: 'Corolla',
        idCliente: 1
      }
    }
  */
);

router.put(
  "/:id",
  authorize("RECEPCIONISTA", "DUEÑO"),
  validate(actualizarVehiculoSchema),
  putVehiculo,
  /*
    #swagger.tags = ['Vehículos']
    #swagger.summary = 'Actualizar un vehículo'
    #swagger.description = 'Actualiza los datos de un vehículo existente.'

    #swagger.parameters['id'] = {
      in: 'path',
      required: true,
      type: 'integer',
      description: 'ID del vehículo'
    }

    #swagger.parameters['body'] = {
      in: 'body',
      required: true,
      schema: {
        placa: 'ABC123',
        marca: 'Toyota',
        modelo: 'Corolla',
        idCliente: 1
      }
    }
  */
);

export default router;
