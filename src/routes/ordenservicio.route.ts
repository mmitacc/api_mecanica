import { Router } from "express";
import {
  getOrden,
  postOrden,
  UpdateOrden,
  getReporteFecha
} from "../controllers/ordenservicio.controllers";
import { validate } from "../middlewares/validateSchema.middleware";
import {
  createOrdenSchema,
  UpdateOrdenSchema,
} from "../schemas/ordenservicio.schema";

import { authorize } from "../middlewares/authorize.middleware";
import { verifyToken } from "../middlewares/auth.middleware";
const router = Router();

router.get("/", verifyToken,authorize("RECEPCIONISTA","MECANICO","DUEÑO") ,getOrden);
router.post("/",verifyToken,authorize("RECEPCIONISTA","DUEÑO"),validate(createOrdenSchema, "body"),postOrden);
router.put("/:id",verifyToken,authorize("MECANICO","DUEÑO") ,validate(UpdateOrdenSchema, "body"), UpdateOrden);
router.get("/reporte",verifyToken,authorize("DUEÑO"),getReporteFecha);
export default router;