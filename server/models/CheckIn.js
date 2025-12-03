// models/CheckIn.js
const mongoose = require('mongoose');

const checkInSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  status: {
    type: String,
    enum: ['okay', 'need-help', 'emergency'],
    required: true,
  },
  method: {
    type: String,
    enum: ['app', 'sms', 'email'],
    required: true,
  },
  message: String,
  location: {
    latitude: Number,
    longitude: Number,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('CheckIn', checkInSchema);