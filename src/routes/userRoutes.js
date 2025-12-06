import { Router } from "express";
import { autenticate } from '../middleware/autenticate.js';
import { updateUserAvatar } from '../controllers/userController.js';
import { upload } from '../middleware/upload.js';


const router = Router();

router.patch(
    '/users/me/avatar',
    autenticate,
    upload.single("avatar"),
   updateUserAvatar
);

export default router;
