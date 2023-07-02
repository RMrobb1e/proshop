import express, { Request, RequestHandler, Response } from 'express';
import asyncHandler from '../middleware/asyncHandler';
import Product from '../models/productModel';

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (_req: Request, res: Response) => {
    const products = await Product.find({}).exec();

    res.json(products);
  }) as RequestHandler
);

router.get(
  '/:id',
  asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id).exec();

    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('Product not found');
    }
  }) as RequestHandler
);

export default router;
