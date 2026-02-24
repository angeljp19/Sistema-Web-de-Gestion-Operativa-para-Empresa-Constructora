import { Router } from "express";
import { login } from "../controllers/AuthController";
import { validarCodigo, recuperarContraseña} from "../controllers/AuthController";

const router = Router();

router.post("/", login);

router.post("/recuperarContrasena", recuperarContraseña)
router.post("/validarCodigo", validarCodigo)


export default router;
