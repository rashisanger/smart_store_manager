
const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const dashboardController = require("../controllers/dashboardController");

// OVERVIEW
router.get(
  "/overview",
  protect,
  dashboardController.getOverview
);

// TOP PRODUCTS
router.get(
  "/top-products",
  protect,
  dashboardController.getTopProducts
);

// REVENUE TREND
router.get(
  "/revenue-trend",
  protect,
  dashboardController.getRevenueTrend
);

module.exports = router;

