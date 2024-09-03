require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    const adminExists = await Admin.findOne({ username: 'admin' });
    if (adminExists) {
      console.log('Admin user already exists');
      return;
    }

    const admin = new Admin({
      username: 'admin',
      password: '123', // This will be hashed
    });

    await admin.save();
    console.log('Admin user created');
    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
};

seedAdmin();
