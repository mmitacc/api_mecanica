import { Router } from "express";
import {
  getUsuarios,
  getById,
  putUsuario,
  putUsuarioPassword,
  deleteUsuario,
  registerUsuario,
  getMecanico,
} from "../controllers/usuario.controller";
import { authorize } from "../middlewares/authorize.middleware";

const router = Router();

router.get(
  "/",
  authorize("DUEÑO"),
  getUsuarios,
  /*  
    #swagger.tags = ['Usuario']
    #swagger.summary = 'Obtener todos los Usuarios'
    #swagger.description = 'Retorna toda la lista de usuarios con todos sus campos'
  */
);

router.get(
  "/mecanico",
  authorize("MECANICO"),
  getMecanico,
  /*  
    #swagger.tags = ['Usuario']
    #swagger.summary = 'Trae todas las ordenes-servicios asignadas al Mecanico logueado'
    #swagger.description = 'Retorna el mecanico y todas sus ordenes-servicios asignadas a él.'
  */
);

router.get(
  "/:id",
  authorize("DUEÑO"),
  getById,
  /*  
    #swagger.tags = ['Usuario']
    #swagger.summary = 'Ubica un Usuario por su ID'
    #swagger.description = 'Retorna el usuario encontrado, con todos sus campos'
    #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID numérico de un usuario',
    required: true,
    type: 'integer'
    }    
  */
);

router.post(
  "/register",
  authorize("DUEÑO"),
  registerUsuario,
  /* 
    #swagger.tags = ['Usuario']
    #swagger.tags = ['Auth']
    #swagger.summary = 'Registrar un Usuario nuevo'
    #swagger.description = 'Retorna el Usuario nuevo'
    #swagger.requestBody = {
        description: 'Crea un Usuario: nombres, apellidos, email, password y role (MECANICO, RECEPCIONISTA, DUEÑO)',
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {                
                      "nombres": {type: 'string', example: "Juan"},
                      "apellidos": {type: 'string', example: "Perez"},
                      "email": {type: 'string', example: "juan@taller.com"},
                      "password": {type: 'string', example: "password123"},                      
                      "role": {type: 'string', example: "MECANICO"}
                    }
                }
            }
        }
    }       
  */
);

router.put(
  "/password",
  putUsuarioPassword,
  /*  
    #swagger.tags = ['Usuario']
    #swagger.summary = 'Actualiza el PASSWORD de un usuario logueado correctamente'
    #swagger.description = 'Retorna un mensaje de confirmación'
    #swagger.requestBody = {
        description: 'Solo se puede actualizar el PASSWORD, del usuario propietario',
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {                
                      "email": {type: 'string', example: "juan@taller.com"},
                      "password": {type: 'string', example: "Password123"},
                    }
                }
            }
        }
    }    
  */
);

router.put(
  "/:id",
  authorize("DUEÑO"),
  putUsuario,
  /*  
    #swagger.tags = ['Usuario']
    #swagger.summary = 'Actualiza uno ó más datos del Usuario'
    #swagger.description = 'Retorna el usuario actualizado'
    #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID numérico de un usuario',
    required: true,
    type: 'integer'
    }    
    #swagger.requestBody = {
        description: 'Actualiza un Usuario, uno o más campos: nombres, apellidos, email, y role (MECANICO, RECEPCIONISTA, DUEÑO)',
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {                
                      "nombres": {type: 'string', example: "Juan"},
                      "apellidos": {type: 'string', example: "Perez"},
                      "email": {type: 'string', example: "juan@taller.com"},
                      "role": {type: 'string', example: "MECANICO"}
                    }
                }
            }
        }
    }    
  */
);

router.delete(
  "/:id",
  authorize("DUEÑO"),
  deleteUsuario,
  /*  
    #swagger.tags = ['Usuario']
    #swagger.summary = 'Elimina un Usuario'
    #swagger.description = 'Retorna el usuario eliminado, con todos sus campos'
    #swagger.parameters['id'] = {
    in: 'path',
    description: 'ID numérico de un usuario',
    required: true,
    type: 'integer'
    }    
  */
);

export default router;
