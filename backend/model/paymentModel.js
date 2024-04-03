import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      required: true,
    },
    order_id: {
      type: mongoose.Types.ObjectId,
      ref: "Orders",
      required: true,
    },
    payer_currency: {
      type: String,
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    payment_amount: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    network: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("payment", paymentSchema);
