import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import channelModel from "../model/channelModel.js";
import userModel from "../model/userModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

// Create Order
export const createOrder = async (req, res) => {
  try {
    const { userId, channelId, price } = req.body;

    if (!userId) {
      return res.status(400).send({
        success: false,
        message: "User id is required!",
      });
    }
    if (!channelId) {
      return res.status(400).send({
        success: false,
        message: "Channel id is required!",
      });
    }
    if (!price) {
      return res.status(400).send({
        success: false,
        message: "Price is required!",
      });
    }
    // Get Channel
    const channel = await channelModel.findById({ _id: channelId });
    if (!channel) {
      return res.status(400).send({
        success: true,
        message: "Channel not found!",
      });
    }
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(400).send({
        success: true,
        message: "Sell User not found!",
      });
    }

    const lineItems = [
      {
        price_data: {
          currency: "usd",
          unit_amount: price * 100,
          product_data: {
            name: channel.name,
            description: channel.channelLink,
          },
        },
        quantity: 1,
      },
    ];

    // Create Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.SUCCESS_URI}/success`,
      cancel_url: `${process.env.CANCEL_URI}/error`,
      metadata: {
        sellerId: channel.userId,
        sellerName: user.name,
        sellerEmail: user.email,
        channelId: channelId,
        channelName: channel.name,
        channelLink: channel.channelLink,
        price: price,
      },
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send({
      success: false,
      message: "Error in order controller.",
      error,
    });
  }
};

// Webhook endpoint to listen for Stripe events
export const webhookHandler = async (req, res) => {
  try {
    const sig = req.headers["stripe-signature"];
    const buf = req.body;
    const webhookSecret = process.env.STRIPE_WEBHOOKS_SECRET;

    let event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      // On error, log and return the error message.
      if (err instanceof Error) console.log(err);
      console.log(`❌ Error message: ${errorMessage}`);

      return res.status(400).json({
        error: {
          message: `Webhook Error: ${errorMessage}`,
        },
      });
    }

    // Successfully constructed event.
    console.log("✅ Success:", event.id);

    // getting to the data we want from the event
    const subscription = event.data.object;
    const itemId = subscription.items.data[0].price.product;

    // Fetch the product (plan) details
    const product = await stripe.products.retrieve(itemId);

    const planName = product.name;

    switch (event.type) {
      case "customer.subscription.created":
        // customer subscription created
        const membership = await subscriptionModel.findOne({
          stripeCustomerId: subscription.customer,
        });

        if (membership) {
          await subscriptionModel.updateOne(
            {
              stripeCustomerId: subscription.customer,
            },
            { $set: { plan: planName } }
          );
        }
        break;
      case "customer.subscription.deleted":
        // subscription deleted
        break;

      default:
        console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
        break;
    }

    return res.status(200).json({
      success: true,
      message: "",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error in webhook controller",
      error,
    });
  }
};

// export const stripeWebhook = async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       req.rawBody,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     console.error("Webhook error:", err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // Handle the event
//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object;

//     try {
//       // Retrieve payment details
//       const paymentIntent = await stripe.paymentIntents.retrieve(
//         session.payment_intent
//       );

//       console.log(paymentIntent);

//       // Save payment details to the database
//       const order = new OrderModel({
//         sellerId: paymentIntent.metadata.sellerId,
//         sellerName: paymentIntent.metadata.sellerName,
//         sellerEmail: paymentIntent.metadata.sellerEmail,
//         channelId: paymentIntent.metadata.channelId,
//         channelName: paymentIntent.metadata.channelName,
//         channelLink: paymentIntent.metadata.channelLink,
//         paymentId: paymentIntent.id,
//         price: paymentIntent.amount,
//       });

//       await order.save();
//       console.log("Payment details saved:", order);
//     } catch (error) {
//       console.error("Error retrieving payment details:", error);
//     }
//   } else if (event.type === "invoice.payment_succeeded") {
//     const invoice = event.data.object;

//     try {
//       // Retrieve payment details from the invoice
//       const paymentIntent = await stripe.paymentIntents.retrieve(
//         invoice.payment_intent
//       );

//       console.log(paymentIntent);

//       // Save payment details to the database
//       const order = new OrderModel({
//         sellerId: paymentIntent.metadata.sellerId,
//         sellerName: paymentIntent.metadata.sellerName,
//         sellerEmail: paymentIntent.metadata.sellerEmail,
//         channelId: paymentIntent.metadata.channelId,
//         channelName: paymentIntent.metadata.channelName,
//         channelLink: paymentIntent.metadata.channelLink,
//         paymentId: paymentIntent.id,
//         price: paymentIntent.amount,
//       });

//       await order.save();
//       console.log("Payment details saved:", order);
//     } catch (error) {
//       console.error("Error retrieving payment details from invoice:", error);
//     }
//   }

//   res.status(200).end();
// };
