import express from 'express';
import { 
  createBooking, 
  getBookings, 
  getUserBookings,
  updateBookingStatus 
} from '../controllers/bookingController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authMiddleware, createBooking);
router.get('/', authMiddleware, adminMiddleware, getBookings);
router.get('/user/my-bookings', authMiddleware, getUserBookings);
router.patch('/:id', authMiddleware, adminMiddleware, updateBookingStatus);

export default router;
