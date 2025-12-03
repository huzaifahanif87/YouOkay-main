// models/Alert.js
const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['missed-checkin', 'emergency', 'help-needed'],
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'resolved', 'false-alarm'],
    default: 'active',
  },
  triggeredAt: {
    type: Date,
    default: Date.now,
  },
  resolvedAt: Date,
  notificationsSent: [{
    contactId: String,
    method: String,
    sentAt: Date,
    delivered: Boolean,
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Alert', alertSchema);
