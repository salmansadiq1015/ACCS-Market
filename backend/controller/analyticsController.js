import channelModel from "../model/channelModel.js";
import orderModel from "../model/orderModel.js";
import userModel from "../model/userModel.js";
import { generateLast12MonthData } from "../utils/analyticsGenerator.js";

// Get User Analytics
export const userAnalytics = async (req, res) => {
  try {
    const users = await generateLast12MonthData(userModel);

    res.status(200).send({
      success: true,
      message: "User Analytics",
      users: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in user analytics!",
      error,
    });
  }
};

// Get User Analytics
export const channelsAnalytics = async (req, res) => {
  try {
    const channel = await generateLast12MonthData(channelModel);

    res.status(200).send({
      success: true,
      message: "User Analytics",
      channel: channel,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in user analytics!",
      error,
    });
  }
};

// Sellers
export const sellersAnalytics = async (req, res) => {
  try {
    const seller = await generateLast12MonthData(channelModel);

    res.status(200).send({
      success: true,
      message: "User Analytics",
      seller: seller,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in user analytics!",
      error,
    });
  }
};

export const BlogsAnalytics = async (req, res) => {
  try {
    const users = await generateLast12MonthData(channelModel);

    res.status(200).send({
      success: true,
      message: "User Analytics",
      users: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in user analytics!",
      error,
    });
  }
};

// Subscription
export const subscriptionAnalytics = async (req, res) => {
  try {
    const orders = await generateLast12MonthData(orderModel);

    res.status(200).send({
      success: true,
      message: "User Analytics",
      orders: orders,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in user analytics!",
      error,
    });
  }
};
