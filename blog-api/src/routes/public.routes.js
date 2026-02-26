import express from 'express';
import postController from '../controllers/post.js';
import commentController from '../controllers/comment.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

// Post routes
router.get('/posts', postController.getAll);
router.get('/posts/search', postController.search);
router.get('/posts/slug/:slug', postController.getBySlug);

// Comment routes
router.get('/posts/:postId/comments', commentController.getByPostId);
router.post('/posts/:postId/comments', requireAuth, commentController.create);
router.put('/posts/:postId/comments/:commentId', requireAuth, commentController.update);
router.delete('/posts/:postId/comments/:commentId', requireAuth, commentController.delete);

export default router;