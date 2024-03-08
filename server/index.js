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

// Dotenv Config
dotenv.config();

// Database Config

// Middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Database
connectDB();

// All Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/channel", channelRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/orders", ordersRoutes);
app.use("/api/v1/layout", layoutRoutes);

// Rest API Call
app.use("/", (req, res) => {
  res.send(
    `<h1 style="color: rgb(204, 0, 255);">AssalamoAlaikum, App is runing😇!...</h1>`
  );
});

// PORT
const PORT = process.env.PORT || 5000;

// Listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgGreen.white.bold);
});
