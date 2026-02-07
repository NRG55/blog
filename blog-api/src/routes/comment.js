import express from 'express';
import controller from '../controllers/comment.js'; 

const router = express.Router();

router.get('/', controller.getComments);

export default router;