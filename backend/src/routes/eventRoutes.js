import express from 'express';
import { create, list, join } from '../controllers/eventController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, create);
router.get('/list', list);
router.post('/join', authMiddleware, join);

export default router;