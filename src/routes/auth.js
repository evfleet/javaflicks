import { Router } from 'express';
import AuthController from 'controllers/auth';

const router = new Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/request-reset', AuthController.requestResetPassword);
router.post('/reset-password', AuthController.resetPassword);

export default router;
