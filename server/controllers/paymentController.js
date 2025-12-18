import Stripe from "stripe";
import User from "../models/User.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.user._id.toString();
    const { origin } = req.headers;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: "price_1RrhRe02MUFWbJbRVM4iARDE",
          quantity: 1,
        },
      ],
      success_url: `${origin}/user/emergencyContacts`,
      cancel_url: `${origin}/user/subscription`,
      metadata: {
        userId,
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const cancelSubscription = async (req, res) => {
  const userId = req.user._id.toString();
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const subscriptionId = user.subscriptionId;
    if (!subscriptionId) return res.status(400).json({ message: "No active subscription found" });

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
      cancelAt: cancelAtDate,
    });
  } catch (error) {
    console.error("Cancel subscription error:", error);
    res.status(400).json({ error: error.message });
  }
};
