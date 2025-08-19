// createAdmin.js - Script to create an admin user
const bcrypt = require('bcryptjs');
const { User } = require('./models');

const createAdminUser = async () => {
  try {
    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { email: 'admin@store.com' } });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email: admin@store.com');
      console.log('Password: Admin123!');
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('Admin123!', salt);

    // Create admin user
    const adminUser = await User.create({
      name: 'System Administrator',
      email: 'admin@store.com',
      password: hashedPassword,
      address: '123 Admin Street, Admin City, AC 12345',
      role: 'admin'
    });

    console.log('✅ Admin user created successfully!');
    console.log('📧 Email: admin@store.com');
    console.log('🔑 Password: Admin123!');
    console.log('👤 Role: admin');
    console.log('\n🚀 You can now login with these credentials!');

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    process.exit(0);
  }
};

createAdminUser();
