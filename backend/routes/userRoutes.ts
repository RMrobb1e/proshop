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

router
  .route('/')
  .post(registerUser as RequestHandler)
  .get(getUsers as RequestHandler);
router.post('/logout', logoutUser as RequestHandler);
router.post('/login', authUser as RequestHandler);
router
  .route('/profile')
  .get(getUserProfile as RequestHandler)
  .put(updateUserProfile as RequestHandler);
router
  .route('/:id')
  .delete(deleteUser as RequestHandler)
  .get(getUserById as RequestHandler)
  .put(updateUser as RequestHandler);

export default router;
