
const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const productController = require("../controllers/productController");

// GET ALL PRODUCTS
router.get("/", protect, productController.getAllProducts);

// CREATE PRODUCT
router.post("/", protect, productController.createProduct);

// UPDATE PRODUCT
router.put("/:id", protect, productController.updateProduct);

// DELETE PRODUCT
router.delete("/:id", protect, productController.deleteProduct);

module.exports = router;

