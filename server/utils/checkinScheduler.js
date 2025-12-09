// utils/checkinScheduler.js
import User from '../models/User.js';
import EmergencyAlert from '../models/EmergencyAlert.js';
import { sendSMS, sendToSupport } from './sendSMS.js';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
dayjs.extend(utc);
const MINUTES_FOR_6H = 6;   // change to 360 later
const MINUTES_FOR_12H = 12; // change to 720 later
const MINUTES_FOR_18H = 18; // change to 1080 later
const MINUTES_FOR_24H = 24; // change to 1440 later

const MESSAGE_TIMES = [8,11, 14,16, 20, 2];

export const runScheduledCheckin = async () => {
  const now = dayjs().utc();
  const users = await User.find({ plan: 'premium', isPaused: false });

  for (const user of users) {
    // const diff = now.diff(dayjs(user.lastCheckIn), 'hour');
    const diff = now.diff(dayjs(user.lastCheckIn), 'minute');


    if (diff < MINUTES_FOR_6H) {
      await sendSMS(user.phone, 'Hi! You okay?');
      console.log("message sent")
    } else {
      const checkInTime = dayjs(user.lastCheckIn).format('hh:mm A');
      await sendSMS(user.phone, `Oh dear, you didn’t reply since ${checkInTime}. Are you okay?`);

      if (diff >= MINUTES_FOR_12H && diff < MINUTES_FOR_18H) {
        const contact = user.emergencyContacts[0];
        if (contact) {
          await sendSMS(contact.phone, `Hi, we haven’t heard from ${user.firstName}. Can you check on them?`);

          await EmergencyAlert.create({
            userId: user._id.toString(),
            contact,
            text: `Contacted ${contact.name} due to no reply from ${user.firstName}.`,
            reason: 'inactivity',
          });
        }
      } else if (diff >= MINUTES_FOR_18H && diff < MINUTES_FOR_24H) {
        const lastAlert = await EmergencyAlert.findOne({
          userId: user._id.toString(),
          resolved: false,
        }).sort({ createdAt: -1 });

        if (lastAlert && lastAlert.response) {
          await sendToSupport(`ALERT: No response from user ${user.firstName}, emergency contact replied: ${lastAlert.response}`);
        } else {
          await sendToSupport(`ALERT: No response from user ${user.firstName} or their emergency contact.`);
        }
      }
    }
  }
};