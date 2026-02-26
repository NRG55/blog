import express from 'express';
import postController from '../controllers/post.js';
import requireAuth from '../middleware/requireAuth.js';
import requireAdmin from '../middleware/requireAdmin.js';
import upload from '../config/multer.js';

const router = express.Router();

router.use(requireAuth, requireAdmin);

// ----------- Post routes ------------

router.post('/posts/upload-image', upload.single('file'), postController.uploadImage);
router.delete('/posts/delete-image', postController.deleteImage);

router.patch('/posts/:postId/publish', postController.publish);
router.patch('/posts/:postId/unpublish', postController.unpublish);

router.post('/posts', postController.create);
router.put('/posts/:postId', postController.update);
router.delete('/posts/:postId', postController.delete);

// ----------- Comment routes ------------

export default router;