import express from "express"
import { body } from "express-validator"
import { auth } from "../middlewares/auth.js"
import upload from "../middlewares/uploadMiddleware.js"


const authRoutes = express.Router()

import {
  sendPhoneCode,
  verifyPhoneCode,
  completeRegistration,
  login,
  updateUser,
  deleteUser,
  getCurrentUser,
  sendPhoneUpdateCode,
  verifyAndUpdatePhone,
  toggleAlerts
} from "../controllers/authController.js";

authRoutes.post("/send-code", sendPhoneCode);
authRoutes.post("/verify-code", verifyPhoneCode);
authRoutes.post("/register", upload.single("image"), completeRegistration);

authRoutes.post("/login", login);
authRoutes.put("/alerts/toggle", auth, toggleAlerts);
authRoutes.get("/me", auth, getCurrentUser);
authRoutes.put("/update", auth, upload.single("image"), updateUser);
authRoutes.delete("/delete", auth, deleteUser);

authRoutes.post("/update-phone/send-code", auth, sendPhoneUpdateCode);
authRoutes.post("/update-phone/verify", auth, verifyAndUpdatePhone);

export default authRoutes;