import express from "express";
import { createChat, fetchChat } from "../controller/chatController.js";
import { requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create chat message
router.post("/channel/create-chat", requireSignIn, createChat);

// Fetch Chat
router.get("/channel/getChats/:id", fetchChat);

export default router;
