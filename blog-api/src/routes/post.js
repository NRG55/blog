import express from 'express';
import postController from '../controllers/post.js';
import requireAuth from '../middleware/requireAuth.js';
import multer from 'multer'; 

const router = express.Router();

const upload = multer();

router.post('/', requireAuth, postController.create);
router.get('/', postController.getAll);
router.get('/slug/:slug', postController.getBySlug);
router.put('/:postId', requireAuth, postController.update);
router.delete('/:postId', requireAuth, postController.delete);
router.patch('/:postId/publish', requireAuth, postController.publish);
router.patch('/:postId/unpublish', requireAuth, postController.unpublish);
router.get('/search', postController.search);
router.post('/upload-image', upload.single('file'), postController.uploadImage);

export default router;