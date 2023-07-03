import express, { RequestHandler } from 'express';
const router = express.Router();

import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from '../controllers/userController';
import { protect, admin } from '../middleware/authMiddleware';

router
  .route('/')
  .post(registerUser as RequestHandler)
  .get(
    protect as RequestHandler,
    admin as RequestHandler,
    getUsers as RequestHandler
  );
router.post('/logout', logoutUser as RequestHandler);
router.post('/auth', authUser as RequestHandler);
router
  .route('/profile')
  .get(protect as RequestHandler, getUserProfile as RequestHandler)
  .put(protect as RequestHandler, updateUserProfile as RequestHandler);
router
  .route('/:id')
  .delete(
    protect as RequestHandler,
    admin as RequestHandler,
    deleteUser as RequestHandler
  )
  .get(
    protect as RequestHandler,
    admin as RequestHandler,
    getUserById as RequestHandler
  )
  .put(
    protect as RequestHandler,
    admin as RequestHandler,
    updateUser as RequestHandler
  );

export default router;
