import { Router } from "express";
import {
  getOrden,
  postOrden,
  UpdateOrden,
  getReporteFecha
} from "../controllers/ordenservicio.controllers";

import { authorize } from "../middlewares/authorize.middleware";
import { verifyToken } from "../middlewares/auth.middleware";
const router = Router();

router.get("/", verifyToken,authorize("RECEPCIONISTA","MECANICO","DUEÑO") ,getOrden);
router.post("/",verifyToken,authorize("RECEPCIONISTA","DUEÑO") , postOrden);
router.put("/:id",verifyToken,authorize("MECANICO","DUEÑO") , UpdateOrden);
router.get("/reporte",verifyToken,authorize("DUEÑO"),getReporteFecha);
export default router;