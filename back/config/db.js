const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; // Read from environment variables
    if (!mongoURI) {
      throw new Error('MONGO_URI is not defined');
    }
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDB;
