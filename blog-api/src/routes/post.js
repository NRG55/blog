import express from 'express';
import controller from '../controllers/post.js'; 

const router = express.Router();

router.get('/', controller.getPosts);

export default router;