import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"
import User from "../models/User.js"
import { v2 as cloudinary } from 'cloudinary';
// controllers/authController.js
import { sendCODE } from "../utils/sendSMS.js";
import { getCode, saveCode, verifyAndMark, isPhoneVerifiedInStore, deleteCode } from "../utils/codeStore.js";


// 1. Send Code to New Phone Number
export const sendPhoneUpdateCode = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: "Phone is required" });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  saveCode(phone, code);
  await sendCODE(phone, code);

  res.json({ message: "Verification code sent to new number." });
};

// 2. Verify Code and Update Phone
export const verifyAndUpdatePhone = async (req, res) => {
  const { phone, code } = req.body;
  if (!phone || !code) return res.status(400).json({ message: "Phone and code are required" });

  const isValid = verifyAndMark(phone, code);
  if (!isValid) return res.status(400).json({ message: "Invalid or expired verification code" });

  const user = await User.findById(req.user._id);
  if (!user) return res.status(404).json({ message: "User not found" });

  user.phone = phone;
  user.isPhoneVerified = true;
  await user.save();

  deleteCode(phone);
  res.json({ message: "Phone number updated successfully", phone: user.phone });
};

export const completeRegistration = async (req, res) => {
  const { phone, email, password, firstName, lastName, dob } = req.body;

  // ⛔️ Prevent registration if phone not verified
  const phoneVerified = isPhoneVerifiedInStore(phone);
  if (!phoneVerified) {
    return res.status(403).json({ message: "Phone number not verified" });
  }

  const existingPhone = await User.findOne({ phone });
  if (existingPhone) return res.status(400).json({ message: "User already registered with this phone" });

  const existingEmail = await User.findOne({ email });
  if (existingEmail) return res.status(400).json({ message: "User already registered with this email" });


  const newUser = new User({
    phone,
    email,
    password,
    firstName,
    lastName,
    dob,
    isPhoneVerified: true,
  });

  await newUser.save();

  deleteCode(phone); // ✅ clean up after verified and used
  res.json({ message: "Registration complete" });
};


export const sendPhoneCode = async (req, res) => {
  const { phone } = req.body;
  if (!phone) return res.status(400).json({ message: "Phone is required" });

  const code = Math.floor(100000 + Math.random() * 900000).toString();

  saveCode(phone, code); // ✅ store in memory
  await sendCODE(phone, code);

  res.json({ message: "Verification code sent via SMS" });
};

export const verifyPhoneCode = async (req, res) => {
  const { phone, code } = req.body;
  if (!phone || !code) {
    return res.status(400).json({ message: "Phone and code are required" });
  }

  const isValid = verifyAndMark(phone, code);
  if (!isValid) {
    return res.status(400).json({ message: "Invalid or expired verification code" });
  }

  res.json({ message: "Phone verified successfully" });
};





export const login = async (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg })
    }

    const { email, password } = req.body

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(403).json({ message: "Please register first." });
    }
    if (!user.isPhoneVerified) {
      return res.status(403).json({ message: "Please verify your phone to log in." });
    }


    // Check password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" })
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "fallback_secret", { expiresIn: "7d" })

    res.json({
      message: "Login successful",
      token,
      user,
    })
  } catch (error) {
    console.error("Login error:", error)
    res.status(500).json({ message: "Server error during login" })
  }
}

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email, dob, plan, pausedUntil, password, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Validate current password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect current password" });
    }

    // Update only if present
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (dob) user.dob = dob;
    if (plan) user.plan = plan;
    if (pausedUntil !== undefined) user.pausedUntil = pausedUntil;
    if (typeof newPassword === "string" && newPassword.trim() !== "") {
      user.password = newPassword;
    }

    await user.save();

    res.json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
};


export const toggleAlerts = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Toggle isPaused
    user.isPaused = !user.isPaused;
    await user.save();

    res.json({
      message: user.isPaused ? "Alerts paused" : "Alerts resumed",
      isPaused: user.isPaused,
      user,
    });
  } catch (error) {
    console.error("Toggle alerts error:", error);
    res.status(500).json({ message: "Failed to toggle alerts" });
  }
};


export const deleteUser = async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });


    await user.deleteOne();
    res.json({ success: true, message: "Account deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Server error during account deletion" });
  }
};
