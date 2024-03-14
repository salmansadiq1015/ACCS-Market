import express from "express";
import {
  BlogsAnalytics,
  channelsAnalytics,
  sellersAnalytics,
  subscriptionAnalytics,
  userAnalytics,
} from "../controller/analyticsController.js";

const router = express.Router();

// User Analytics
router.get("/user/analytics", userAnalytics);
// User Analytics
router.get("/channel/analytics", channelsAnalytics);
// User Analytics
router.get("/seller/analytics", sellersAnalytics);
// User Analytics
router.get("/blogs/analytics", BlogsAnalytics);
// User Analytics
router.get("/sub/analytics", subscriptionAnalytics);

export default router;
