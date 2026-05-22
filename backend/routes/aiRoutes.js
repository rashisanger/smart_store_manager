
const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const aiController = require("../controllers/aiController");

// GENERATE DESCRIPTION
router.post(
  "/generate-description",
  protect,
  aiController.generateDescription
);

// GENERATE SEO TAGS
router.post(
  "/generate-tags",
  protect,
  aiController.generateSEOTags
);

// GENERATE CAPTION
router.post(
  "/marketing-caption",
  protect,
  aiController.generateCaption
);

// SALES SUGGESTIONS
router.get(
  "/sales-suggestions",
  protect,
  aiController.getSalesSuggestions
);

module.exports = router;

