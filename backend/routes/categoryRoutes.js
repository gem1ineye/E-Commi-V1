const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

// Public routes

// @route   GET /api/categories
// @desc    Get all categories
// @access  Public
router.get('/', getAllCategories);

// @route   GET /api/categories/:id
// @desc    Get single category
// @access  Public
router.get('/:id', getCategoryById);

// Admin routes (will add auth middleware later)

// @route   POST /api/categories
// @desc    Create new category
// @access  Private/Admin
router.post('/', createCategory);

// @route   PUT /api/categories/:id
// @desc    Update category
// @access  Private/Admin
router.put('/:id', updateCategory);

// @route   DELETE /api/categories/:id
// @desc    Delete category
// @access  Private/Admin
router.delete('/:id', deleteCategory);

module.exports = router;