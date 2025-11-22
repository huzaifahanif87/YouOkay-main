import express from "express";
import "dotenv/config";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/db.js";

dotenv.config();

// Connect to DB and Cloudinary
connectDB();
// connectCloudinary();

// Setup Express and HTTP Server
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => res.send("Hello my new World!"));

// Start the unified server (for both HTTP and WebSocket)
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});