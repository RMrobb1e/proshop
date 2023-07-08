import express, { RequestHandler } from 'express';
const router = express.Router();

import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
} from '../controllers/orderController';
import { protect, admin } from '../middleware/authMiddleware';

router
  .route('/')
  .post(protect as RequestHandler, addOrderItems as RequestHandler)
  .get(
    protect as RequestHandler,
    admin as RequestHandler,
    getOrders as RequestHandler
  );

router
  .route('/mine')
  .get(protect as RequestHandler, getMyOrders as RequestHandler);
router
  .route('/:id')
  .get(protect as RequestHandler, getOrderById as RequestHandler);
router
  .route('/:id/pay')
  .put(protect as RequestHandler, updateOrderToPaid as RequestHandler);

router
  .route('/:id/deliver')
  .put(
    protect as RequestHandler,
    admin as RequestHandler,
    updateOrderToDelivered as RequestHandler
  );

export default router;
