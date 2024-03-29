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
    paymentStatus: {
      type: String,
      default: "Processing",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Orders", orderSchema);
