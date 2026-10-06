import { Router } from 'express';
import * as controller from '../controllers/admin.controller.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.use(authenticate, authorize('ADMIN'));

router.get('/dashboard', controller.dashboard);
router.get('/ratings', controller.listRatings);

router.get('/users', controller.listUsers);
router.post('/users', controller.createUser);
router.get('/users/:id', controller.userDetails);
router.patch('/users/:id', controller.updateUser);
router.delete('/users/:id', controller.deleteUser);

router.get('/store-owners', controller.listStoreOwners);
router.get('/stores', controller.listStores);
router.post('/stores', controller.createStore);
router.get('/stores/:id', controller.storeDetails);
router.patch('/stores/:id', controller.updateStore);
router.delete('/stores/:id', controller.deleteStore);

export default router;
