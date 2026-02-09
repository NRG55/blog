import express from 'express';
import controller from '../controllers/post.js';
import requireAuth from '../middleware/requireAuth.js'; 

const router = express.Router();

router.get('/', controller.getPosts);
router.post('/', requireAuth, controller.createPost);

export default router;