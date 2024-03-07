import express from "express";
import {
  allUsers,
  deleteUser,
  loginUser,
  profileImage,
  register,
  resetPassword,
  singleUser,
  updatePassword,
  updateProfile,
  verificationUser,
} from "../controller/userController.js";
import formidable from "express-formidable";

const router = express.Router();

// Register
router.post("/register", formidable(), register);
// Verification
router.post("/verification-account", verificationUser);
// Login
router.post("/login-user", loginUser);
// Update Profile
router.put("/update-profile/:id", formidable(), updateProfile);
// Get All Users
router.get("/all-users", allUsers);

// Single User
router.get("/single-user/:id", singleUser);

// Delete User
router.delete("/delete-user/:id", deleteUser);
// User Avatar
router.get("/user-avatar/:id", profileImage);

// Reset Password
router.post("/reset-password", resetPassword);
// Update Password
router.patch("/update-password", updatePassword);

export default router;
