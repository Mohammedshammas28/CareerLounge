import express from 'express';
import { signup, login } from '../controllers/authController.js';
import { resetPasswordSimple } from '../controllers/passwordResetController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/reset-password-simple', resetPasswordSimple);

export default router;
