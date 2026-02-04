import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import { User } from './models/User.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    // Force delete existing admin
    await User.deleteOne({ email: process.env.ADMIN_EMAIL });
    console.log('Previous admin user deleted');

    // Create admin user
    const admin = await User.create({
      name: process.env.ADMIN_NAME || 'Career Lounge Admin',
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: 'admin',
    });

    console.log('Admin user created successfully:', {
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
};

seedAdmin();
