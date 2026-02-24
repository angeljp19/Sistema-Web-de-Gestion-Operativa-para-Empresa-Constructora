import { Router } from "express";
import HoraEscaneoEmpleadosController from "../controllers/HoraEscaneoEmpleadoController";
const router = Router();
import { validateSchema } from "../middleware/validateSchema";
import {createHoraEscaneoSchema, idHoraEscaneoSchema} from "../joiSchemas/horaEscaneoSchema"

router.get("/", HoraEscaneoEmpleadosController.getAll);
router.get("/:id", validateSchema(idHoraEscaneoSchema),HoraEscaneoEmpleadosController.getById);
router.post("/", validateSchema(createHoraEscaneoSchema), HoraEscaneoEmpleadosController.create);

export default router;
