import { Request, Response } from 'express';
import asyncHandler from '../middleware/asyncHandler';
import Order from '../models/orderModel';

// @desc Create new order
// @route GET /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req: Request, res: Response) => {
  res.send('add order items');
});

// @desc Get logged in user orders
// @route GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req: Request, res: Response) => {
  res.send('get my orders');
});

// @desc Get order by ID
// @route GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req: Request, res: Response) => {
  res.send('get order by id');
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
