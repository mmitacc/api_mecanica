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
    */
);

router.post(
  "/register",
  register,
  /* #swagger.security = [{ "bearerAuth": [] }] */
  /*  
    #swagger.tags = ['Auth']
    #swagger.summary = 'Registrar un Usuario nuevo'
    #swagger.description = 'Retorna el Usuario nuevo'
    */
);

export default router;
