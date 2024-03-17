import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import channelModel from "../model/channelModel.js";
import userModel from "../model/userModel.js";
import orderModel from "../model/orderModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

// Create Order
export const createOrder = async (req, res) => {
  try {
    const { userId, channelId, price, buyerEmail } = req.body;

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
        buyerEmail: buyerEmail,
      },
    });

    res.json({ id: session.id, metaData: session.metadata });
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

// Store Order In Database
export const storeOrder = async (req, res) => {
  try {
    const {
      sellerId,
      sellerName,
      sellerEmail,
      buyerEmail,
      channelId,
      channelName,
      channelLink,
      price,
      paymentId,
    } = req.body;

    if (
      !sellerId ||
      !sellerName ||
      !sellerEmail ||
      !buyerEmail ||
      !channelId ||
      !channelName ||
      !channelLink ||
      !price ||
      !paymentId
    ) {
      return res
        .status(400)
        .send({ success: false, message: "Provide all required fields!" });
    }

    await orderModel.create({
      sellerId,
      sellerName,
      sellerEmail,
      buyerEmail,
      channelId,
      channelName,
      channelLink,
      price,
      paymentId,
    });

    res.status(200).send({
      success: true,
      message: "Order is created!",
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: false,
      message: "Error in store order controller!",
      error,
    });
  }
};

// Get All Order
export const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).send({
      success: true,
      message: "All orders",
      orders: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: false,
      message: "Error in get all orders controller!",
      error,
    });
  }
};

// Get Seller Order
export const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.params.id;
    const orders = await orderModel.find({ sellerId: sellerId });
    res.status(200).send({
      success: true,
      message: "All orders",
      orders: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: false,
      message: "Error in get seller order controller!",
      error,
    });
  }
};
