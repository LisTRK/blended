import { celebrate } from "celebrate";
import { Router } from "express";
import { loginUserSchema, registerUserSchema } from "../validations/authValidation.js";
import { refreshSession, userLogin, userLogout, userRegister } from "../controllers/authController.js";


const router = Router();

router.post("/auth/register", celebrate(registerUserSchema), userRegister);
router.post("/auth/login", celebrate(loginUserSchema), userLogin);
router.post('/auth/logout', userLogout);
router.post('/auth/refresh', refreshSession);

export default router;


