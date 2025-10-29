import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { connectDB } from '../config/database';
import { User } from '../models/User.model';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();
    
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('❌ Admin already exists');
      process.exit(0);
    }
    
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    await User.create({
      username: 'admin',
      password: hashedPassword
    });
    
    console.log('✅ Admin user created successfully');
    console.log('Username: admin');
    console.log('Password: admin123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

seedAdmin();
