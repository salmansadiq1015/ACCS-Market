import express from "express";
import {
  createMessages,
  getMessages,
} from "../controller/messageController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Messages
router.post("/channel/create-messages", requireSignIn, createMessages);
// Display all messages
router.get("/channel/get-messages/:id", getMessages);

export default router;
