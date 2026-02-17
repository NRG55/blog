import express from 'express';
import postController from '../controllers/post.js';
import requireAuth from '../middleware/requireAuth.js'; 

const router = express.Router();

router.post('/', requireAuth, postController.create);
router.get('/', postController.getPosts);
router.get('/slug/:slug', postController.getBySlug);
router.put('/:postId', requireAuth, postController.update);
router.delete('/:postId', requireAuth, postController.delete);
router.patch('/:postId/publish', requireAuth, postController.publish);
router.patch('/:postId/unpublish', requireAuth, postController.unpublish);
router.get('/search', postController.search);

export default router;