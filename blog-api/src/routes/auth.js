import express from 'express';
import controller from '../controllers/auth.js'; 

const router = express.Router();

router.get('/signup', controller.signup);
router.get('/login', controller.login);

export default router;