import express from "express";
import { createOrder } from "../controller/ordersController.js";

const router = express.Router();

// Buy Channel
router.post("/channel/payment", createOrder);


export default router;
