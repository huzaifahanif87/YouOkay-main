// routes/twilio.js
import express from 'express';
import { handleIncomingMessage } from '../controllers/messageWebhook.js';
const twilioRouter = express.Router();

twilioRouter.post('/webhook/twilio', handleIncomingMessage);

export default twilioRouter;