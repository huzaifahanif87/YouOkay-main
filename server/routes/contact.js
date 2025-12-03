// /routes/contact.js
import express from "express";
import { sendMail } from "../utils/emailService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ error: "All fields are required" });

  const emailResult = await sendMail({
    to: process.env.ZOHO_EMAIL, // send to yourself
    subject: `YouOkay: New message from ${name} (${email})`,
    text: message,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
  });

  if (emailResult.success) {
    res.status(200).json({ message: "Message sent successfully" });
  } else {
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
