import { Router } from 'express';
import * as controller from '../controllers/owner.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.use(authenticate, authorize('STORE_OWNER'));

router.get('/dashboard', controller.dashboard);
router.get('/store', controller.myStore);
router.patch('/store', controller.updateStore);
router.get('/ratings', controller.ratings);

export default router;
