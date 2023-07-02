import express, { RequestHandler } from 'express';
import { getProductById, getProducts } from '../controllers/productController';

const router = express.Router();

router.route('/').get(getProducts as RequestHandler);
router.route('/:id').get(getProductById as RequestHandler);

export default router;
