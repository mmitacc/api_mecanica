import { Router } from "express";
import { delte, getall, update, createdetalle } from "../controllers/detalles.controller";
import { validatedetalles } from "../middlewares/detalle.midlewares";
import { creardetalleschema, updatedetalleschema } from "../schemas/detalles.schemas";
import { authorize } from "../middlewares/authorize.middleware";


const router:Router = Router()

router.get("/",authorize("DUEÑO", "MECANICO"), getall)
router.put("/:id",authorize("DUEÑO", "MECANICO"), validatedetalles(updatedetalleschema, "body"), update)
router.delete("/:id",authorize("DUEÑO") , delte)
router.post("/",authorize("DUEÑO", "MECANICO"),validatedetalles(creardetalleschema,"body"), createdetalle)

export default router