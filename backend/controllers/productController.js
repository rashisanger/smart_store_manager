
const Product = require("../models/Product");

// GET ALL PRODUCTS
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({
      owner: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Server error",
    });
  }
};

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      stock,
      description,
      seoTags,
      marketingCaption,
    } = req.body;

    // Validation
    if (!name || !category || price === undefined) {
      return res.status(400).json({
        error: "Name, category and price are required",
      });
    }

    // Create product
    const product = new Product({
      name,
      category,
      price,
      stock,
      description,
      seoTags,
      marketingCaption,
      owner: req.user.id,
    });

    await product.save();

    return res.status(201).json(product);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Server error",
    });
  }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user.id,
      },
      req.body,
    {
            returnDocument: "after",
            runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Server error",
    });
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!deletedProduct) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Server error",
    });
  }
};

