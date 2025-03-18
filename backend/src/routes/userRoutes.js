import express from 'express';
import { register, login, updateUser } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/:userId', authMiddleware, updateUser); // Add this line for updating user

export default router;