import { Router } from "express";
import ProductoController from "../controllers/ProductosController";
import { validateSchema } from "../middleware/validateSchema";
import {
  createProductoSchema,
  deleteProductoSchema,
  updateProductoSchema,
} from "../joiSchemas/productoSchema";
const router = Router();

router.get("/", ProductoController.getAll);
router.get(
  "/:id",
  validateSchema(deleteProductoSchema, "params"),
  ProductoController.getById
);

router.post("/", validateSchema(createProductoSchema), ProductoController.create);

router.put(
  "/:id",
  validateSchema(deleteProductoSchema, "params"),
  validateSchema(updateProductoSchema),
  ProductoController.update
);

router.delete(
  "/:id",
  validateSchema(deleteProductoSchema, "params"),
  ProductoController.delete
);

export default router;
