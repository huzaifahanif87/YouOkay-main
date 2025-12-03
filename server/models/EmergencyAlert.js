// models/EmergencyAlert.js
import mongoose from 'mongoose';

const emergencyAlertSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.String, // same as User._id (string)
    required: true,
  },
  contact: {
    name: String,
    phone: String,
    relationship: String,
    priority: Number,
  },
  reason: {
    type: String,
    enum: ['inactivity', 'distress'],
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  contactedAt: {
    type: Date,
    default: Date.now,
  },
  response: {
    type: String,
    default: null,
  },
  respondedAt: Date,
  resolved: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

export default mongoose.model('EmergencyAlert', emergencyAlertSchema);
