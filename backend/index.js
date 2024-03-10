import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
import channelRoutes from "./routes/channelRoutes.js";
import commentRoutes from "./routes/commentRoute.js";
import ordersRoutes from "./routes/ordersRoutes.js";
import layoutRoutes from "./routes/LayoutRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messagesRoutes.js";
import { Server } from "socket.io";

// Dotenv Config
dotenv.config();

// Database Call
connectDB();

// Middlewares
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// All Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/channel", channelRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/orders", ordersRoutes);
app.use("/api/v1/layout", layoutRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/message", messageRoutes);

// Rest API Call
app.use("/", (req, res) => {
  res.send("Server is running!");
});

// PORT
const PORT = process.env.PORT || 5000;

// Listening
const server = app.listen(PORT, () => {
  console.log(` Server is running on Port ${PORT}`.bgGreen.white);
});

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://accs-market.vercel.app",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io server!");
  // Connect User
  socket.on("setup", (userData) => {
    socket.join(userData.id);
    socket.emit("connected");
  });

  // Join Chat
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User join room:", room);
  });

  // Typing
  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });
  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });

  // Send Message
  socket.on("new message", (newMessageReceived) => {
    const chat = newMessageReceived.chat;
    console.log(chat);

    if (!chat.users) return console.log("Chat.users not defined!");

    chat.users.forEach((user) => {
      if (user._id === newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  // Turn off Socket
  socket.off("setup", () => {
    console.log("User Disconnected!");
    socket.leave(userData.id);
  });
});
