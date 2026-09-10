import { Router } from "express";
import { loginUsuario } from "../controllers/usuario.controller";
import { validate } from "../middlewares/validateSchema.middleware";
import { AuthUsuarioSchema } from "../schemas/usuario.schema";

const router = Router();

router.post(
  "/login",
  loginUsuario,
  validate(AuthUsuarioSchema, "body"),
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
                      "email": {type: 'string', example: "juan@taller.com"},
                      "password": {type: 'string', example: "123456"},
                    }
                }
            }
        }
    }        
  */
);

export default router;
