import { Router } from "express";
import { loginUsuario } from "../controllers/usuario.controller";

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

export default router;
