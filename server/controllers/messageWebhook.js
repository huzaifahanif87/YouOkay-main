// controllers/messageWebhook.js
import EmergencyAlert from '../models/EmergencyAlert.js';
import User from '../models/User.js';

export const handleIncomingMessage = async (req, res) => {
  const { From, Body } = req.body;
  const phone = From.replace('+', '');

  let user = await User.findOne({ phone });
  if (user) {
    user.lastCheckIn = new Date();
    await user.save();
    return res.send(`<Response><Message>Thanks for checking in 💙</Message></Response>`);
  }

  const alert = await EmergencyAlert.findOne({ 'contact.phone': phone, resolved: false });
  if (alert) {
    alert.response = Body;
    alert.respondedAt = new Date();
    alert.resolved = true;
    await alert.save();
    return res.send(`<Response><Message>Thanks for your response.</Message></Response>`);
  }

  // Help/distress detection
  if (/\b(help|no)\b/i.test(Body)) {
    if (user) {
      const contact = user.emergencyContacts[0];
      if (contact) {
        await sendSMS(contact.phone, `Emergency: ${user.firstName} just sent a distress message. Please check on them.`);
        await EmergencyAlert.create({
          userId: user._id.toString(),
          contact,
          text: `Emergency help message received from ${user.firstName}`,
          reason: 'distress',
        });
      }
    }
  }

  res.send(`<Response><Message>Message received. We’re on it.</Message></Response>`);
};
