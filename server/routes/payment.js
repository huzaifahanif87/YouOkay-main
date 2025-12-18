import express from "express";
import Stripe from "stripe";
import { auth } from "../middlewares/auth.js"
import User from "../models/User.js";
const paymentRouter = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

paymentRouter.post("/", auth, async (req, res) => {
  try {
    const userId = req.user._id.toString(); // Assuming you're using middleware for JWT
    console.log(userId)
    const { origin } = req.headers;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1RrhRe02MUFWbJbRVM4iARDE", // ✅ String wrapped!
          quantity: 1,
        },
      ],
      success_url: `${origin}/user/emergencyContacts`,
      cancel_url: `${origin}/user/subscription`,
      metadata: {
        userId: req.user._id.toString()
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



paymentRouter.post("/cancel-subscription", auth, async (req, res) => {
  const userId = req.user._id.toString();

  console.log(req.body);
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });
  const subscriptionId = user.subscriptionId;
  try {
    const deleted = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });
    const cancelAtDate = new Date(deleted.cancel_at * 1000);
    user.subscriptionStatus = "canceled";
    user.currentPeriodEnd = cancelAtDate;
    await user.save();

    res.json({
      message: `Subscription will cancel at period end on ${cancelAtDate.toISOString()}`,
      status: deleted.status,
      cancelAt: cancelAtDate, // optional: return as Date object
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


export default paymentRouter;
