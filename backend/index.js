import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoute.js";


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


// Rest API Call
app.use("/", (req, res) => {
  res.send("Server is running!");
});

// PORT
const PORT = process.env.PORT || 5000;

// Listening
app.listen(PORT, () => {
  console.log(` Server is running on Port ${PORT}`.bgGreen.white);
});

