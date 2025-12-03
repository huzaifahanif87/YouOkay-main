// // routes/payments.js
// import express from "express"
// import { auth } from "../middlewares/auth.js"
// import User from "../models/User.js"

// const paymentRouter = express.Router()

// paymentRouter.post("/upgrade", auth, async (req, res) => {
//   try {
//     const { paymentToken } = req.body

//     // TODO: Optionally verify token with gateway (Stripe, etc.)

//     const userId = req.user._id

//     const user = await User.findById(userId)
//     if (!user) return res.status(404).json({ message: "User not found" })

//     user.plan = "premium"
//     await user.save()

//     res.status(200).json({ message: "User upgraded to premium" })
//   } catch (error) {
//     console.error("Upgrade error:", error)
//     res.status(500).json({ message: "Failed to upgrade user" })
//   }
// })

// export default paymentRouter



import express from "express";
import Stripe from "stripe";
import { auth } from "../middlewares/auth.js"
const paymentRouter = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

paymentRouter.post("/",auth, async (req, res) => {
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
        userId:req.user._id.toString() 
      },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Stripe error", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



paymentRouter.post("/cancel-subscription",auth, async (req, res) => {
  const { subscriptionId } = req.body;

  try {
    const deleted = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    res.json({ message: "Subscription will cancel at period end", status: deleted.status });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


export default paymentRouter;
