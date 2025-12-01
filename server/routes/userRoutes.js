// --- userRoutes: routes/userRoutes.js ---
import express from "express"
import { auth } from "../middlewares/auth.js"
import {
  getEmergencyContacts,
  addEmergencyContact,
  updateEmergencyContact,
  deleteEmergencyContact,
} from "../controllers/userController.js"

const userRoutes = express.Router()

userRoutes.get("/contacts", auth, getEmergencyContacts)
userRoutes.post("/contacts", auth, addEmergencyContact)
userRoutes.put("/contacts/:id", auth, updateEmergencyContact)
userRoutes.delete("/contacts/:id", auth, deleteEmergencyContact)

export default userRoutes
