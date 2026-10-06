import { Router } from 'express';
import * as controller from '../controllers/store.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.use(authenticate, authorize('USER', 'STORE_OWNER'));

router.get('/', controller.listStores);
router.get('/:storeId', controller.storeDetails);

router.put(
  '/:storeId/rating',
  authorize('USER'),
  controller.upsertRating
);

export default router;
