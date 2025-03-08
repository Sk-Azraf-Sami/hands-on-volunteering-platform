import express from 'express';
import { create, list, get, join, listMembers } from '../controllers/teamController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, create);
router.get('/list', list);
router.get('/:teamId', get);
router.post('/join', authMiddleware, join);
router.get('/:teamId/members', listMembers);

export default router;