import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import channelModel from "../model/channelModel.js";
import userModel from "../model/userModel.js";
import orderModel from "../model/orderModel.js";
import axios from "axios";
import crypto from "crypto";
import paymentModel from "../model/paymentModel.js";

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

// Update Payment Status
export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus } = req.body;
    const orderId = req.params.id;
    if (!paymentStatus) {
      return res.status(400).send({
        success: false,
        message: "Payment status is required!",
      });
    }

    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { $set: { paymentStatus: paymentStatus } },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Payment status updated!",
      order: order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while Update payment status!",
      error,
    });
  }
};

// Delete Order
export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(400).send({
        success: false,
        message: "Order not found!",
      });
    }

    await orderModel.findByIdAndDelete({ _id: order._id });

    res.status(200).send({
      success: true,
      message: "Order deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while delete order!",
      error,
    });
  }
};

// ------------------Crypto Payment----------->

export const createCryptoPayment = async (req, res) => {
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

    // Create new order (process.env.CRYPTOMUS_URI)

    const order = await orderModel.create({
      sellerId: userId,
      sellerName: user.name,
      sellerEmail: user.email,
      channelId: channelId,
      channelName: channel.name,
      channelLink: channel.channelLink,
      price: price,
      buyerEmail: buyerEmail,
    });

    // Create Payment Intend
    const payload = {
      amount: price.toString(),
      currency: "usd",
      order_id: order._id,
      url_callback: `${process.env.SUCCESS_URI}/success`,
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
    };
    const merchant = process.env.CRYPTO_MERCHANT_ID;
    const bufferData = Buffer.from(JSON.stringify(payload))
      .toString("base64")
      .concat(process.env.MERCHANT_API_KEY);

    const sign = crypto.createHash("md5").update(bufferData).digest("hex");
    const { data } = await axios.post(
      `${process.env.CRYPTOMUS_URI}/payment`,
      payload,
      {
        headers: {
          merchant,
          sign,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).send({
      success: true,
      messsage: "Payment Success!",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while making payment!",
      error,
    });
  }
};

export const paymentSuccess = async (req, res) => {
  try {
    const {
      sign,
      order_id,
      uuid,
      payer_currency,
      amount,
      payment_amount,
      currency,
      network,
    } = req.body;

    if (!sign) {
      return res.status(400).send({
        success: false,
        message: "Invalid Payment!",
      });
    }

    const order = await orderModel.findById(order_id);
    if (!order) {
      return res.status(400).send({
        success: false,
        message: "Invalid order!",
      });
    }

    const payment = await paymentModel.create({
      uuid,
      order_id,
      payer_currency,
      amount,
      payment_amount,
      currency,
      network,
    });

    order.paymentStatus = "paid";
    order.payment_info = payment._id;
    await order.save();

    res.status(200).send({
      success: true,
      url: payment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong!",
      error,
    });
  }
};
