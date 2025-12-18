import express from "express";
import bodyParser from "body-parser";
import { handleStripeWebhook } from "../controllers/stripeWebhook.js";

const router = express.Router();

// Stripe requires raw body to validate signature
router.post("/", bodyParser.raw({ type: "application/json" }), handleStripeWebhook);

export default router;
