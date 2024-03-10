import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import channelModel from "../model/channelModel.js";
import userModel from "../model/userModel.js";
import OrderModel from "../model/OrderModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

// Create Order
export const createOrder = async (req, res) => {
  try {
    const { userId, channelId, price } = req.body;
    console.log(userId, channelId, price);
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
    console.log("Session:", session);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).send({
      success: false,
      message: "Error in order controller.",
      error,
    });
  }
};
