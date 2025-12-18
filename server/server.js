import express from "express";
import "dotenv/config";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./configs/db.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import contactRoutes from "./routes/contact.js";
import twilioRouter from "./routes/twilio.js"
import paymentRouter from "./routes/payment.js"
import webhookRouter from "./routes/webhook.js";
import cron from "node-cron";
import { runScheduledCheckin } from "./utils/checkinScheduler.js";


dotenv.config();

// Connect to DB
connectDB();

// Setup Express and HTTP Server
const app = express();

// Middlewares
app.use("/api/stripe", webhookRouter)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => res.send("Hello my new World!"));
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes)
app.use("/api/contact", contactRoutes);
app.use("/api/twilio", twilioRouter)
app.use("/api/payments", paymentRouter)
// Start the unified server (for both HTTP and WebSocket)
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


// cron.schedule("*/4 * * * *", async () => {
//   console.log(`🕒 [${new Date().toLocaleTimeString()}] Cron job triggered`);
//   await runScheduledCheckin();
// });