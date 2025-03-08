import express from 'express';
import { create, list, comment, listComments } from '../controllers/helpRequestController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, create);
router.get('/list', list);
router.post('/comment', authMiddleware, comment);
router.get('/:helpRequestId/comments', listComments);

export default router;