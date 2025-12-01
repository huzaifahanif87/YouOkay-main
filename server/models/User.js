import mongoose from "mongoose"
import bcrypt from "bcryptjs"
const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true, // Important
  },
  verificationCode: String,
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  dob:{
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  plan: {
    type: String,
    enum: ["free", "premium"],
    default: "free",
  },
  emergencyContacts: [{
    name: String,
    phone: String,
    relationship: String,
    priority: Number,
  }],
  lastCheckIn: {
    type: Date,
    default: Date.now,
  },
  isPaused: {
    type: Boolean,
    default: false,
  },
  pausedUntil: Date,
  stripeCustomerId: {
    type: String,
  },
  subscriptionId: {
    type: String,
  },
  subscriptionStatus: {
    type: String, // active, incomplete, canceled, etc.
  },
  currentPeriodEnd: {
    type: Date,
  },


}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next()

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}


export default mongoose.model('User', userSchema);