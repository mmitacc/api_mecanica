import { Router } from "express";
import {
  getUsuarios,
  getById,
  putUsuario,
  putUsuarioPassword,
  deleteUsuario,
  registerUsuario,
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
        description: 'Actualizar el email, role y/o username de un usuario',
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {                
                      "nombres": {type: 'string', example: "Juan"},
                      "apellidos": {type: 'string', example: "Perez"},
                      "email": {type: 'string', example: "jp@mail.com"},
                      "password": {type: 'string', example: "123456"},                      
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
                      "email": {type: 'string', example: "jp@mail.com"},
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
        description: 'Actualizar el email, role y/o username de un usuario',
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: 'object',
                    properties: {                
                      "nombres": {type: 'string', example: "Juan"},
                      "apellidos": {type: 'string', example: "Perez"},
                      "email": {type: 'string', example: "jp@mail.com"},
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
