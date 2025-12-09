// /utils/emailService.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.ZOHO_EMAIL, // example: you@example.com
    pass: process.env.ZOHO_APP_PASSWORD, // from Zoho's application-specific password
  },
});

export const sendMail = async ({ to, subject, text, html }) => {
  try {
    const mailOptions = {
      from: `"You Okay?" <${process.env.ZOHO_EMAIL}>`,
      to,
      subject,
      text,
      html,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result.messageId);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
};
