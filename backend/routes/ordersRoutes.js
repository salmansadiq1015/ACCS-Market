import express from "express";
import {
  createOrder,
  getAllOrders,
  getSellerOrders,
  storeOrder,
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

export default router;
