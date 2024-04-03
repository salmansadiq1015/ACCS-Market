import express from "express";
import {
  createCryptoPayment,
  createOrder,
  deleteOrder,
  getAllOrders,
  getSellerOrders,
  storeOrder,
  updatePaymentStatus,
  webhookHandler,
} from "../controller/ordersController.js";

const router = express.Router();

// Buy Channel
router.post("/channel/payment", createOrder);

// Webhook
router.get("/stripe/webhook", webhookHandler);

// Create Order
router.post("/create/order", storeOrder);

// ALl Order
router.get("/all-orders", getAllOrders);

// Seller Orders
router.get("/seller-orders/:id", getSellerOrders);

// Update Order Status
router.put("/order-status/:id", updatePaymentStatus);

// Delete Order
router.delete("/order-delete/:id", deleteOrder);

// Create Crypto Payment
router.post("/checkout", createCryptoPayment);

export default router;
