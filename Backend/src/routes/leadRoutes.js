import express from 'express';
import { createLead, getLeads, updateLeadStatus } from '../controllers/leadController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createLead);
router.get('/', authMiddleware, adminMiddleware, getLeads);
router.patch('/:id', authMiddleware, adminMiddleware, updateLeadStatus);

export default router;
