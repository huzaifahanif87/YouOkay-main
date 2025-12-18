import Stripe from "stripe";
import User from "../models/User.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        const subscriptionId = session.subscription;
        const customerId = session.customer;

        if (!userId || !subscriptionId) break;

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);

        // Set current period end +30 days if Stripe doesn't provide it
        const currentPeriodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

        await User.findByIdAndUpdate(userId, {
          stripeCustomerId: customerId,
          subscriptionId,
          subscriptionStatus: subscription.status,
          currentPeriodEnd,
          lastCheckIn: new Date(),
          plan: "premium",
        });

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object;

        await User.findOneAndUpdate(
          { subscriptionId: subscription.id },
          {
            subscriptionStatus: "canceled",
            plan: "free",
          }
        );
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.status(200).send("Webhook received");
  } catch (error) {
    console.error("Error handling Stripe webhook:", error);
    res.status(500).send("Internal Server Error");
  }
};
