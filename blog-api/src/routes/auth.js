import express from 'express';
import controller from '../controllers/auth.js';
import validateSignup from '../validators/signup.js';
import handleValidation from '../middleware/handleValidation.js'; 

const router = express.Router();

router.post('/signup', validateSignup, handleValidation, controller.signup);
router.post('/login', controller.login);

export default router;