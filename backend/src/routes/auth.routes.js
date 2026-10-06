import { Router } from 'express';
import * as controller from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/me', authenticate, controller.me);
router.post('/logout', controller.logout);
router.patch('/password', authenticate, controller.changePassword);

export default router;
