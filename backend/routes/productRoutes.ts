import express, { RequestHandler } from 'express';
import {
  createProduct,
  getProductById,
  getProducts,
} from '../controllers/productController';
import { admin, protect } from '../middleware/authMiddleware';

const router = express.Router();

router
  .route('/')
  .get(getProducts as RequestHandler)
  .post(
    protect as RequestHandler,
    admin as RequestHandler,
    createProduct as RequestHandler
  );
router.route('/:id').get(getProductById as RequestHandler);

export default router;
