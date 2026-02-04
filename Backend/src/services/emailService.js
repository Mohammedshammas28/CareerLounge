import { Resend } from 'resend';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

console.log('Email Service Configured:');
console.log(`  Service: Resend`);
console.log(`  API Key configured: ${!!process.env.RESEND_API_KEY}`);

// Send email to admin when user books appointment
export const sendAdminBookingNotification = async (bookingDetails) => {
  const { name, email, phone, service, date, timeSlot } = bookingDetails;
  
  const emailContent = `
    <h2 style="color: #d4af37;">New Appointment Booking</h2>
    <p><strong>Client Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Service:</strong> ${service}</p>
    <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
    <p><strong>Time Slot:</strong> ${timeSlot}</p>
    <p style="margin-top: 20px; color: #666;">Please review and approve/reject this booking in your admin dashboard.</p>
  `;

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Career Lounge <onboarding@resend.dev>',
      to: process.env.ADMIN_EMAIL,
      subject: `New Appointment Booking - ${service}`,
      html: emailContent,
    });
    console.log('Admin notification email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return false;
  }
};

// Send email to user when admin approves booking
export const sendUserApprovalConfirmation = async (bookingDetails) => {
  const { name, email, date, timeSlot, service } = bookingDetails;
  
  const emailContent = `
    <h2 style="color: #d4af37;">Your Appointment is Confirmed!</h2>
    <p>Hello ${name},</p>
    <p>Great news! Your appointment with Career Lounge has been confirmed.</p>
    <p><strong>Service:</strong> ${service}</p>
    <p><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
    <p><strong>Time:</strong> ${timeSlot}</p>
    <p style="margin-top: 20px;">Our slot has been booked for you. We look forward to meeting you!</p>
    <p>If you have any questions, feel free to contact us at <strong>alman.travels2020@gmail.com</strong> or <strong>+91 7396460717</strong></p>
    <p style="margin-top: 30px; color: #666;">Best regards,<br/>Career Lounge Team</p>
  `;

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Career Lounge <onboarding@resend.dev>',
      to: email,
      subject: 'Your Appointment is Confirmed - Career Lounge',
      html: emailContent,
    });
    console.log('User approval confirmation email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending user confirmation email:', error);
    return false;
  }
};

// Send email to user when booking is rejected
export const sendUserRejectionNotification = async (bookingDetails) => {
  const { name, email } = bookingDetails;
  
  const emailContent = `
    <h2 style="color: #d4af37;">Appointment Status Update</h2>
    <p>Hello ${name},</p>
    <p>Unfortunately, your appointment request could not be confirmed at this time.</p>
    <p>Please contact us at <strong>alman.travels2020@gmail.com</strong> or <strong>+91 7396460717</strong> to schedule at a different time or discuss alternative options.</p>
    <p style="margin-top: 30px; color: #666;">Best regards,<br/>Career Lounge Team</p>
  `;

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Career Lounge <onboarding@resend.dev>',
      to: email,
      subject: 'Appointment Status Update - Career Lounge',
      html: emailContent,
    });
    console.log('User rejection notification email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending user rejection email:', error);
    return false;
  }
};

// Send password reset email
export const sendPasswordResetEmail = async (userEmail, userName, resetUrl) => {
  const emailContent = `
    <h2 style="color: #d4af37;">Password Reset Request</h2>
    <p>Hello ${userName},</p>
    <p>We received a request to reset your password. Click the link below to create a new password:</p>
    <p style="margin: 20px 0;">
      <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #d4af37; color: #0a1220; text-decoration: none; border-radius: 6px; font-weight: bold;">Reset Password</a>
    </p>
    <p style="color: #666; font-size: 12px;">Or copy this link: <code>${resetUrl}</code></p>
    <p style="color: #999; font-size: 12px; margin-top: 20px;">This link will expire in 1 hour. If you did not request this, please ignore this email.</p>
    <p style="margin-top: 30px; color: #666;">Best regards,<br/>Career Lounge Team</p>
  `;

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Career Lounge <onboarding@resend.dev>',
      to: userEmail,
      subject: 'Password Reset Request - Career Lounge',
      html: emailContent,
    });
    console.log('Password reset email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return false;
  }
};

// Send password reset confirmation email
export const sendPasswordResetConfirmation = async (userEmail, userName) => {
  const emailContent = `
    <h2 style="color: #d4af37;">Password Reset Successful</h2>
    <p>Hello ${userName},</p>
    <p>Your password has been successfully reset. You can now log in with your new password.</p>
    <p style="margin: 20px 0;">
      <a href="${process.env.FRONTEND_URL}/login" style="display: inline-block; padding: 12px 24px; background-color: #d4af37; color: #0a1220; text-decoration: none; border-radius: 6px; font-weight: bold;">Log In to Your Account</a>
    </p>
    <p style="color: #999; font-size: 12px; margin-top: 20px;">If you did not reset your password, please contact us immediately at <strong>alman.travels2020@gmail.com</strong></p>
    <p style="margin-top: 30px; color: #666;">Best regards,<br/>Career Lounge Team</p>
  `;

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Career Lounge <onboarding@resend.dev>',
      to: userEmail,
      subject: 'Password Reset Confirmation - Career Lounge',
      html: emailContent,
    });
    console.log('Password reset confirmation email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending password reset confirmation email:', error);
    return false;
  }
};
