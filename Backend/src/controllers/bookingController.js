import { Booking } from '../models/Booking.js';
import {
  sendAdminBookingNotification,
  sendUserApprovalConfirmation,
  sendUserRejectionNotification,
} from '../services/emailService.js';

export const createBooking = async (req, res) => {
  try {
    const { name, email, phone, service, date, timeSlot, notes } = req.body;

    if (!name || !email || !phone || !service || !date || !timeSlot) {
      return res.status(400).json({ message: 'All fields except notes are required' });
    }

    const booking = await Booking.create({
      userId: req.user.id,
      name,
      email,
      phone,
      service,
      date: new Date(date),
      timeSlot,
      notes,
    });

    // Send email notification to admin (fire and forget - don't wait)
    sendAdminBookingNotification({
      name,
      email,
      phone,
      service,
      date,
      timeSlot,
    }).catch(err => console.error('Failed to send email:', err));

    res.status(201).json({
      message: 'Booking created successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId', 'name email').sort({ date: -1 });
    res.json({
      message: 'Bookings retrieved successfully',
      bookings,
      total: bookings.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).sort({ date: -1 });
    res.json({
      message: 'User bookings retrieved successfully',
      bookings,
      total: bookings.length,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Send email to user based on status update
    if (status === 'confirmed') {
      await sendUserApprovalConfirmation({
        name: booking.name,
        email: booking.email,
        date: booking.date,
        timeSlot: booking.timeSlot,
        service: booking.service,
      });
    } else if (status === 'rejected') {
      await sendUserRejectionNotification({
        name: booking.name,
        email: booking.email,
      });
    }

    res.json({
      message: 'Booking updated successfully',
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
