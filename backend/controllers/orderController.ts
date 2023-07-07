import { Request, Response } from 'express';
import asyncHandler from '../middleware/asyncHandler';
import Order from '../models/orderModel';

// @desc Create new order
// @route GET /api/orders
// @access Private
const addOrderItems = asyncHandler(
  async (req: Request & { user: { _id: string } }, res: Response) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    console.log(req);

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error('No order items');
    }

    const order = new Order({
      orderItems: orderItems.map((order) => ({
        ...order,
        product: order._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
);

// @desc Get logged in user orders
// @route GET /api/orders/mine
// @access Private
const getMyOrders = asyncHandler(
  async (req: Request & { user: { _id: string } }, res: Response) => {
    const orders = await Order.find({ user: req.user._id }).exec();

    res.status(200).json(orders);
  }
);

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.id)
    .populate('user', 'name email')
    .exec();

  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }

  res.status(200).json(order);
});

// @desc Update order to paid
// @route GET /api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req: Request, res: Response) => {
  res.send('update order to paid');
});

// @desc Update order to delivered
// @route GET /api/orders/:id/deliver
// @access Private
const updateOrderToDelivered = asyncHandler(
  async (req: Request, res: Response) => {
    res.send('update order to deliverd');
  }
);

// @desc Get all orders
// @route GET /api/orders
// @access Private
const getOrders = asyncHandler(async (req: Request, res: Response) => {
  res.send('get orders');
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
};
