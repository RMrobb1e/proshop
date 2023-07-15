import { Request, Response } from 'express';
import asyncHandler from '../middleware/asyncHandler';
import Product from '../models/productModel';

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find({}).exec();

  res.json(products);
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id).exec();

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc Create a product
// @route POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(
  async (req: Request & { user: any }, res: Response) => {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: req.user._id,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'Sample description',
    });

    const createdProduct = await product.save();

    res.status(201).json(createdProduct);
  }
);

// @desc Update a products
// @route PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id).exec();

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  product.name = name;
  product.price = price;
  product.description = description;
  product.image = image;
  product.brand = brand;
  product.category = category;
  product.countInStock = countInStock;

  const updatedProduct = await product.save();

  res.json(updatedProduct);
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id).exec();

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  await Product.deleteOne({ _id: product._id }).exec();

  res.status(200).json({ message: 'Product deleted' });
});

// @desc Create a new review
// @route POST /api/products/:id/reviews
// @access Private
const createProductReview = asyncHandler(
  async (
    req: Request & { user: { _id: number; name: string } },
    res: Response
  ) => {
    const product = await Product.findById(req.params.id).exec();

    if (!product) {
      res.status(404);
      throw new Error('Product not found');
    }

    const { rating, comment } = req.body.review;
    const alreadyReviewed = product.reviews.find(
      (r: any) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc: any, item: any) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  }
);

export {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
