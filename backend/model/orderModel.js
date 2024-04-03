import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    sellerId: {
      type: String,
      required: true,
    },
    sellerName: {
      type: String,
      required: true,
    },
    sellerEmail: {
      type: String,
      required: true,
    },
    buyerEmail: {
      type: String,
    },
    channelId: {
      type: String,
      required: true,
    },
    channelName: {
      type: String,
      required: true,
    },
    channelLink: {
      type: String,
      required: true,
    },
    paymentId: {
      type: String,
    },
    price: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    payment_info: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Orders", orderSchema);
