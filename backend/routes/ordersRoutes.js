import express from "express";
import { createOrder, webhookHandler } from "../controller/ordersController.js";

const router = express.Router();

// Buy Channel
router.post("/channel/payment", createOrder);

// Webhook
router.get("/stripe/webhook", webhookHandler);

export default router;
