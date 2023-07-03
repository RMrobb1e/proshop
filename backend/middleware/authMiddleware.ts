import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler';
import User from '../models/userModel';
import { Request, Response, NextFunction } from 'express';

// Protect routes
const protect = asyncHandler(
  async (req: Request & { user: any }, res: Response, next: NextFunction) => {
    let token: string;

    // Read the JWT from the cookie
    token = req.cookies.jwt;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

        req.user = await User.findById(decoded.userId)
          .select('-password')
          .exec();

        next();
      } catch (error) {
        console.log(error);
        res.status(401);
        throw new Error('Not authorized, token failed');
      }
    } else {
      res.status(401);
      throw new Error('Not authorized, no token');
    }
  }
);

// Admin middleware
const admin = (
  req: Request & { user: any },
  res: Response,
  next: NextFunction
) => {
  if (req.user?.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as admin');
  }
};

export { protect, admin };
