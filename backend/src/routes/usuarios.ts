import { Router } from "express";
import UsuarioController from "../controllers/UsuarioController";
import { requireAuth } from "../middleware/authMiddleware";
import { validateSchema } from "../middleware/validateSchema";
import {createUsuarioSchema, idUsuarioSchema, updateUsuarioSchema} from "../joiSchemas/usuarioSchema"
const router = Router();

router.get("/", UsuarioController.getAll);
router.get(
  "/:id",
  validateSchema(idUsuarioSchema, "params"),
  UsuarioController.getById
);

router.post(
  "/",
  validateSchema(createUsuarioSchema),
  UsuarioController.create
);

router.put(
  "/:id",
  validateSchema(idUsuarioSchema, "params"),
  validateSchema(updateUsuarioSchema),
  UsuarioController.update
);

router.delete(
  "/:id",
  validateSchema(idUsuarioSchema, "params"),
  UsuarioController.delete
);

export default router;
