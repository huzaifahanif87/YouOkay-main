import express from "express";
import Stripe from "stripe";
import bodyParser from "body-parser";
import User from "../models/User.js"; // Adjust path if different

const webhookRouter = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

webhookRouter.post(
  "/",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
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
          

          await User.findByIdAndUpdate(userId, {
            stripeCustomerId: customerId,
            subscriptionId,
            subscriptionStatus: subscription.status,
            plan: "premium", // ✅ Upgrade to premium on success
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
      console.error("Error in Stripe webhook:", error);
      res.status(500).send("Internal Server Error");
    }
  }
);

export default webhookRouter;
 