import EmergencyAlert from '../models/EmergencyAlert.js';
import User from '../models/User.js';
import { sendSMS } from '../utils/sendSMS.js'; // adjust path if needed

const DISTRESS_REGEX = /\b(help|no)\b/i;

export const handleIncomingMessage = async (req, res) => {
  try {
    const { From, Body } = req.body;
    console.log('Incoming message:', { from: From, body: Body });

    if (!From || !Body) {
      return res
        .status(400)
        .send('<Response><Message>Invalid message.</Message></Response>');
    }

    const phone = From; // use exactly as stored
    const message = Body.trim();

    /* -------------------- 1. Find User -------------------- */
    const user = await User.findOne({ phone });
    console.log('Associated user:', user ? user._id : 'None');

    /* -------------------- 2. Distress Detection -------------------- */
    if (user && DISTRESS_REGEX.test(message)) {
      const contact = user.emergencyContacts?.[0];

      if (contact) {
        await sendSMS(
          contact.phone,
          `🚨 Emergency Alert: ${user.firstName} just sent a distress message. Please check on them immediately.`
        );

        await EmergencyAlert.create({
          userId: user._id.toString(),
          contact,
          text: message,
          reason: 'distress',
          resolved: false,
        });
      }

      return sendTwiML(res, 'We’ve alerted your emergency contact. Help is on the way.');
    }

    /* -------------------- 3. Regular User Check-In -------------------- */
    if (user) {
      user.lastCheckIn = new Date();
      await user.save();

      return sendTwiML(res, 'Thanks for checking in 💙');
    }

    /* -------------------- 4. Emergency Contact Response -------------------- */
    const alert = await EmergencyAlert.findOne({
      'contact.phone': phone,
      resolved: false,
    });

    if (alert) {
      alert.response = message;
      alert.respondedAt = new Date();
      alert.resolved = true;
      await alert.save();

      return sendTwiML(res, 'Thanks for your response.');
    }

    /* -------------------- 5. Fallback -------------------- */
    return sendTwiML(res, 'Message received. We’re on it.');

  } catch (err) {
    console.error('Webhook error:', err);
    return res
      .status(500)
      .send('<Response><Message>Something went wrong.</Message></Response>');
  }
};

/* -------------------- Helper -------------------- */
function sendTwiML(res, message) {
  res.set('Content-Type', 'text/xml');
  return res.send(`<Response><Message>${message}</Message></Response>`);
}
