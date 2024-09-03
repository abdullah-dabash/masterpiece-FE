// models/Renovation.js
const mongoose = require('mongoose');

const renovationSchema = new mongoose.Schema({
  roomImage: {
    type: String,
    required: true,
  },
  wallHeight: {
    type: Number,
    required: true,
  },
  wallWidth: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Renovation', renovationSchema);
