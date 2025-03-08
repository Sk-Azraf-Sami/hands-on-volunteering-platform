import express from 'express';
import { log, listByUser, verify, leaderboard } from '../controllers/volunteerHoursController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/log', authMiddleware, log);
router.get('/user', authMiddleware, listByUser);
router.post('/verify', authMiddleware, verify);
router.get('/leaderboard', leaderboard);

export default router;