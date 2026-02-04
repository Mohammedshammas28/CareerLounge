import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB } from './config/database.js';
import { User } from './models/User.js';
import authRoutes from './routes/authRoutes.js';
import leadRoutes from './routes/leadRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Log email configuration
console.log('Email Service Configured:');
console.log(`  Service: ${process.env.EMAIL_SERVICE || 'gmail'}`);
console.log(`  User: ${process.env.EMAIL_USER}`);
console.log(`  Password configured: ${!!process.env.EMAIL_PASSWORD}`);

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
await connectDB();

// Auto-seed admin user on startup
const seedAdminOnStartup = async () => {
  try {
    // Force delete existing admin
    await User.deleteOne({ email: process.env.ADMIN_EMAIL });
    
    console.log('Creating fresh admin user with email:', process.env.ADMIN_EMAIL);
    const admin = await User.create({
      name: process.env.ADMIN_NAME || 'Career Lounge Admin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'admin',
    });
    console.log('✓ Admin user created successfully:', admin.email);
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
};

await seedAdminOnStartup();

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running', timestamp: new Date().toISOString() });
});

// Error handling middleware (MUST be after routes)
app.use((err, req, res, next) => {
  console.error('Error caught by error handler:', err);
  res.status(500).json({ message: 'Internal server error', error: err.message });
});

// 404 handler (MUST be last)
app.use((req, res) => {
  console.log('404 - Route not found:', req.method, req.path);
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
