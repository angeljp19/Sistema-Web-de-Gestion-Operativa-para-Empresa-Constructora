import { Router } from "express";
import PlantaController from "../controllers/PlantaController";
import { validateSchema } from "../middleware/validateSchema";
import {createPlantaSchema, idPlantaSchema, updatePlantaSchema}  from "../joiSchemas/plantaSchema"
const router = Router();

router.get("/", PlantaController.getAll);
router.get("/:id", validateSchema(idPlantaSchema), PlantaController.getById);
router.post("/", validateSchema(createPlantaSchema),PlantaController.create);
router.put("/:id", validateSchema(idPlantaSchema), validateSchema(updatePlantaSchema), PlantaController.update);
router.delete("/:id", validateSchema(idPlantaSchema), PlantaController.delete);

export default router;
