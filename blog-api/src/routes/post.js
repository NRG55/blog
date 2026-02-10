import express from 'express';
import controller from '../controllers/post.js';
import requireAuth from '../middleware/requireAuth.js'; 

const router = express.Router();

router.post('/', requireAuth, controller.createPost);
router.get('/', controller.getPosts);
router.put('/:postId', requireAuth, controller.updatePost);
router.delete('/:postId', requireAuth, controller.deletePost);

export default router;