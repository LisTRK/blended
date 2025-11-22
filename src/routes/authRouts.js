import { celebrate } from "celebrate";
import { Router } from "express";
import { registerUserSchema } from "../validations/authValidation.js";
import { userRegister } from "../controllers/authController.js";


const router = Router();

router.post("/auth/register", celebrate(registerUserSchema), userRegister);


export default router;
