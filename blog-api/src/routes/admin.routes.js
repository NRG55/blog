import express from 'express';
import postController from '../controllers/post.js';
import requireAuth from '../middleware/requireAuth.js';
import requireAdmin from '../middleware/requireAdmin.js';
import upload from '../config/multer.js';
import commentController from '../controllers/comment.js';

const router = express.Router();

router.use(requireAuth, requireAdmin);

// Post routes
router.get('/posts/search', postController.adminSearch);

router.post('/posts/upload-image', upload.single('file'), postController.uploadImage);
router.delete('/posts/delete-image', postController.deleteImage);

router.patch('/posts/:postId/publish', postController.publish);
router.patch('/posts/:postId/unpublish', postController.unpublish);

router.post('/posts', postController.create);
router.put('/posts/:postId', postController.update);
router.delete('/posts/:postId', postController.delete);

// Comment routes
router.get('/comments', commentController.getAll);
router.get('/comments/:commentId', commentController.getById);
router.delete('/comments/:commentId', commentController.delete);

export default router;