const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductReviews
} = require('../controllers/productController');

// Public routes

// @route   GET /api/products/search
// @desc    Search products
// @access  Public
router.get('/search', searchProducts);

// @route   GET /api/products
// @desc    Get all products with filters
// @access  Public
router.get('/', getAllProducts);

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get('/:id', getProductById);

// @route   GET /api/products/:id/reviews
// @desc    Get product reviews
// @access  Public
router.get('/:id/reviews', getProductReviews);

// Admin routes (will add auth middleware later)

// @route   POST /api/products
// @desc    Create new product
// @access  Private/Admin
router.post('/', createProduct);

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private/Admin
router.put('/:id', updateProduct);

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private/Admin
router.delete('/:id', deleteProduct);

module.exports = router;