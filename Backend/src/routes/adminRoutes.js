import express from 'express';
import { getUsers, deleteUser, getStats } from '../controllers/adminController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/users', authMiddleware, adminMiddleware, getUsers);
router.delete('/users/:id', authMiddleware, adminMiddleware, deleteUser);
router.get('/stats', authMiddleware, adminMiddleware, getStats);

export default router;
