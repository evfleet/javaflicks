import { Router } from 'express';
import AuthRoutes from './auth';

const router = new Router();

router.use('/auth', AuthRoutes);

export default router;
