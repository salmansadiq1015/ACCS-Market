import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  createBlogController,
  deleteBlogController,
  getBlogController,
  singleBlogController,
  updateBlogController,
} from "../controller/blogController.js";

const router = express.Router();

// Create Blog Route
router.post("/create-blog", requireSignIn, isAdmin, createBlogController);

// Get All Blogs
router.get("/get_blogs", getBlogController);

// Upadte Blog
router.put("/update-blog/:id", requireSignIn, isAdmin, updateBlogController);

// Delete Blog
router.delete("/delete-blog/:id", requireSignIn, isAdmin, deleteBlogController);

// Get single blog
router.get("/single-blog/:id", singleBlogController);

export default router;
