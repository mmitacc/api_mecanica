import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { authorize } from "../middlewares/authorize.middleware";

const router = Router();

// router.post("/register", authorize("DUEÑO"), register);
router.post(
  "/login",
  login,
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

router.post(
  "/register",authorize("DUEÑO"),
  register,
  /* 
    #swagger.security = [{ "bearerAuth": [] }]
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

export default router;
