import { Router } from "express";
import { delte, getall, update, createdetalle } from "../controllers/detalles.controller";

const router:Router = Router()

router.get("/", getall)
router.put("/:id", update)
router.delete("/:id", delte)
router.post("/", createdetalle)

export default router