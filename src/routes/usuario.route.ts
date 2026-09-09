import { Router } from "express";
import {
  getUsuarios,
  getById,
  putUsuario,
  putUsuarioPassword,
  deleteUsuario,
  registerUsuario,
  loginUsuario,
} from "../controllers/usuario.controller";
import { authorize } from "../middlewares/authorize.middleware";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.post(
  "/login",
  loginUsuario,
  /*  
    #swagger.tags = ['Auth']
    #swagger.summary = 'logueo a un Usuario y genera su token'
    #swagger.description = 'El token del usuario'
    #swagger.requestBody = {
        description: 'Ingresar sus datos para poder loguearse',
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

router.get(
  "/",
  verifyToken,
  authorize("DUEÑO"),
  getUsuarios,
  /*  
    #swagger.security = [{ "bearerAuth": [] }] 
    #swagger.tags = ['Usuario']
    #swagger.summary = 'Obtener todos los Usuarios'
    #swagger.description = 'Retorna toda la lista de usuarios con todos sus campos'
  */
);

router.get(
  "/:id",
  verifyToken,
  authorize("DUEÑO"),
  getById,
  /*  
    #swagger.security = [{ "bearerAuth": [] }] 
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
  verifyToken,
  authorize("DUEÑO"),
  registerUsuario,
  /* 
    #swagger.security = [{ "bearerAuth": [] }] 
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
  verifyToken,
  putUsuarioPassword,
  /*  
    #swagger.security = [{ "bearerAuth": [] }] 
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
  verifyToken,
  authorize("DUEÑO"),
  putUsuario,
  /*  
    #swagger.security = [{ "bearerAuth": [] }] 
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
  verifyToken,
  authorize("DUEÑO"),
  deleteUsuario,
  /*  
    #swagger.security = [{ "bearerAuth": [] }] 
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
