import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter review name'],
    },
    rating: {
      type: Number,
      required: [true, 'Please enter review rating'],
      default: 0,
    },
    comment: {
      type: String,
      required: [true, 'Please enter review comment'],
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please enter product user'],
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please enter product name'],
      trim: true,
      maxLength: [100, 'Product name cannot exceed 100 characters'],
    },
    brand: {
      type: String,
      required: [true, 'Please enter product brand'],
    },
    price: {
      type: Number,
      required: [true, 'Please enter product price'],
      maxLength: [5, 'Product price cannot exceed 5 characters'],
      default: 0.0,
    },
    description: {
      type: String,
      required: [true, 'Please enter product description'],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, 'Please enter product category'],
    },
    countInStock: {
      type: Number,
      required: [true, 'Please enter product stock'],
      maxLength: [5, 'Product stock cannot exceed 5 characters'],
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
