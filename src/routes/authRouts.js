import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';
import {
  refreshSession,
  requestResetEmail,
  resetPassword,
  userLogin,
  userLogout,
  userRegister,
} from '../controllers/authController.js';

const router = Router();

router.post('/auth/register', celebrate(registerUserSchema), userRegister);
router.post('/auth/login', celebrate(loginUserSchema), userLogin);
router.post('/auth/logout', userLogout);
router.post('/auth/refresh', refreshSession);

router.post(
  '/auth/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail,
);
router.post(
  '/auth/reset-password',
  celebrate(resetPasswordSchema),
  resetPassword,
);

export default router;
