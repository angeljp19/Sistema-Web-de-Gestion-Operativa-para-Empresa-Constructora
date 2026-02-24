import { Router } from "express";
import EmpleadoController from "../controllers/EmpleadoController";
import { validateSchema } from "../middleware/validateSchema";
import {
  createEmpleadoSchema,
  idEmpleadoSchema,
  updateEmpleadoSchema,
} from "../joiSchemas/empleadoSchema";
const router = Router();

router.get("/", EmpleadoController.getAll);
router.get(
  "/:id",
  validateSchema(idEmpleadoSchema, "params"),
  EmpleadoController.getById
);

router.post(
  "/",
  validateSchema(createEmpleadoSchema),
  EmpleadoController.create
);

router.put(
  "/:id",
  validateSchema(idEmpleadoSchema, "params"),
  validateSchema(updateEmpleadoSchema),
  EmpleadoController.update
);

router.delete(
  "/:id",
  validateSchema(idEmpleadoSchema, "params"),
  EmpleadoController.delete
);

export default router;
