import express, { RequestHandler } from 'express';
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
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
router
  .route('/:id')
  .get(getProductById as RequestHandler)
  .put(
    protect as RequestHandler,
    admin as RequestHandler,
    updateProduct as RequestHandler
  )
  .delete(
    protect as RequestHandler,
    admin as RequestHandler,
    deleteProduct as RequestHandler
  );

router
  .route('/:id/reviews')
  .post(protect as RequestHandler, createProductReview as RequestHandler);

export default router;
