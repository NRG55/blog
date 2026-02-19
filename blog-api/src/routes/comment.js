import express from 'express';
import commentController from '../controllers/comment.js';
import requireAuth from '../middleware/requireAuth.js'; 

const router = express.Router({ mergeParams: true });

router.post('/', requireAuth, commentController.create);
router.get('/', commentController.getByPostId);
router.put('/:commentId', requireAuth, commentController.update);
router.delete('/:commentId', requireAuth, commentController.delete);

export default router;