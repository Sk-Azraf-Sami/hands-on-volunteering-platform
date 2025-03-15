import express from 'express';
import { create, list, get, update, remove, comment, listComments } from '../controllers/helpRequestController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, create);
router.get('/list', list);
router.get('/:helpRequestId', get);
router.put('/:helpRequestId', authMiddleware, update);
router.delete('/:helpRequestId', authMiddleware, remove);
router.post('/comment', authMiddleware, comment);
router.get('/:helpRequestId/comments', listComments);

export default router;