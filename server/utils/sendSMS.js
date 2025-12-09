import twilio from "twilio";

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const from = process.env.TWILIO_PHONE;

const client = twilio(accountSid, authToken);

export const sendCODE = async (to, code) => {
  return await client.messages.create({
    body: `Your verification code is: ${code}`,
    from,
    to,
  });
};

export const sendSMS = async (to, body) => {
  try {
    const result = await client.messages.create({
      body,
      from,
      to,
    });
    console.log(`✅ SMS sent to ${to}: ${body}`);
    return result;
  } catch (err) {
    console.error(`❌ Failed to send SMS to ${to}:`, err.message);
  }
};


export const sendToSupport = async (text) => {
  const supportPhone = process.env.SUPPORT_PHONE;
  if (!supportPhone) return;
  await sendSMS(supportPhone, text);
};

