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

// Dotenv Config
dotenv.config();

// Database Call
connectDB();

// Middlewares
const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// All Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/channel", channelRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/orders", ordersRoutes);

// Rest API Call
app.use("/", (req, res) => {
  res.send("<h1>Server is running</h1>");
});

// PORT
const PORT = process.env.PORT || 5000;

// Listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgGreen.white.bold);
});
