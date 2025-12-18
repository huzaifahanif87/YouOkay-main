
import express from "express";
import { auth } from "../middlewares/auth.js";
import { createCheckoutSession, cancelSubscription } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/", auth, createCheckoutSession);
router.post("/cancel-subscription", auth, cancelSubscription);

export default router;

