import { Router } from "express";
import {
  getOrden,
  postOrden,
  UpdateOrden,
} from "../controllers/ordenservicio.controllers";

const router = Router();

router.get("/", getOrden);
router.post("/", postOrden);
router.put("/:id", UpdateOrden);
export default router;