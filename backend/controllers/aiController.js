
const {
  generateDescription,
  generateSEOTags,
  generateMarketingCaption,
  getSalesSuggestions,
} = require("../services/openaiService");

const Product = require("../models/Product");

// GENERATE DESCRIPTION
exports.generateDescription = async (req, res) => {
  try {
    const {
      productName,
      category,
      price,
      productId,
    } = req.body;

    const description = await generateDescription({
      productName,
      category,
      price,
    });

    // Optional DB update
    if (productId) {
      await Product.findOneAndUpdate(
        {
          _id: productId,
          owner: req.user.id,
        },
        {
          description,
        }
      );
    }

    return res.status(200).json({
      description,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "AI generation failed. Please try again.",
    });
  }
};

// GENERATE SEO TAGS
exports.generateSEOTags = async (req, res) => {
  try {
    const { productName, description } = req.body;

    const tags = await generateSEOTags({
      productName,
      description,
    });

    return res.status(200).json({
      tags,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "AI generation failed. Please try again.",
    });
  }
};

// GENERATE MARKETING CAPTION
exports.generateCaption = async (req, res) => {
  try {
    const { productName, description } = req.body;

    const caption = await generateMarketingCaption({
      productName,
      description,
    });

    return res.status(200).json({
      caption,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "AI generation failed. Please try again.",
    });
  }
};

// SALES SUGGESTIONS
exports.getSalesSuggestions = async (req, res) => {
  try {
    const topProducts = await Product.find({
      owner: req.user.id,
    })
      .sort({ revenue: -1 })
      .limit(5);

    const revenueData = await Product.find({
      owner: req.user.id,
    })
      .sort({ updatedAt: -1 })
      .limit(10);

    const suggestions = await getSalesSuggestions(
      topProducts,
      revenueData
    );

    return res.status(200).json({
      suggestions,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "AI generation failed. Please try again.",
    });
  }
};

