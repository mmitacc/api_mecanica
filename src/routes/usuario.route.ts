import { Router } from "express";
import { getUsuarios, postUsuario } from "../controllers/usuario.controller";
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
router.post(
  "/",
  authorize("DUEÑO"),
  postUsuario,
  /*  
    #swagger.tags = ['Usuario']
    #swagger.summary = 'Crear un Usuario nuevo'
    #swagger.description = 'Retorna el usuario creado, con todos sus campos'
    */
);
export default router;
