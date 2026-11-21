const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Admin = require('../models/Admin');

const createDefaultAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ email: process.env.ADMIN_EMAIL });

    if (existingAdmin) {
      console.log('ℹ️  Admin already exists');
      process.exit(0);
    }

    // Create default admin
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    const admin = new Admin({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      name: 'Admin',
      role: 'admin'
    });

    await admin.save();

    console.log('✅ Admin created successfully');
    console.log('📧 Email:', process.env.ADMIN_EMAIL);
    console.log('🔑 Password:', process.env.ADMIN_PASSWORD);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error);
    process.exit(1);
  }
};

createDefaultAdmin();
