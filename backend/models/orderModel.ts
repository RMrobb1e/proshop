import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please enter user'],
      ref: 'User',
    },
    orderItems: [
      {
        name: {
          type: String,
          require: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    shippingInfo: {
      address: {
        type: String,
        required: [true, 'Please enter shipping address'],
      },
      city: {
        type: String,
        required: [true, 'Please enter shipping city'],
      },
      phoneNo: {
        type: String,
        required: [true, 'Please enter shipping phone number'],
      },
      postalCode: {
        type: String,
        required: [true, 'Please enter shipping postal code'],
      },
      country: {
        type: String,
        required: [true, 'Please enter shipping country'],
      },
    },
    paymentResult: {
      id: {
        type: String,
      },
      status: {
        type: String,
      },
      update_time: {
        type: String,
      },
      email_address: {
        type: String,
      },
    },
    itemsPrice: {
      type: Number,
      required: [true, 'Please enter items price'],
      default: 0.0,
    },
    taxPrice: {
      type: Number,
      required: [true, 'Please enter tax price'],
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: [true, 'Please enter shipping price'],
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: [true, 'Please enter total price'],
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: [true, 'Please enter payment status'],
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: [true, 'Please enter delivery status'],
    },
    deliveredAt: {
      type: Date,
    },
    orderStatus: {
      type: String,
      required: [true, 'Please enter order status'],
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
