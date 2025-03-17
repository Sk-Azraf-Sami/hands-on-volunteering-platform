import express from 'express';
import { create, list, get, join, withdraw, listMembers, sendInvitation, acceptInvitation, deleteTeam, getLeaderboard} from '../controllers/teamController.js';
import { createForTeam } from '../controllers/eventController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, create);
router.get('/list', list);
router.get('/:teamId', get);
router.post('/join', authMiddleware, join);
router.post('/withdraw', authMiddleware, withdraw);
router.get('/:teamId/members', listMembers);
router.post('/invite', authMiddleware, sendInvitation);
router.post('/accept-invitation', authMiddleware, acceptInvitation);
router.delete('/:teamId', authMiddleware, deleteTeam);
router.post('/:teamId/events', authMiddleware, createForTeam);
router.get('/leaderboard', getLeaderboard); // Ensure this line is correct

export default router;