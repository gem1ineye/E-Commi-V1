const Category = require('../models/Category');

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .populate('parent', 'name slug')
      .sort({ level: 1, name: 1 });

    res.status(200).json({
      success: true,
      count: categories.length,
      categories
    });

  } catch (error) {
    console.error('Get Categories Error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error while fetching categories'
    });
  }
};

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
      .populate('parent', 'name slug');

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    res.status(200).json({
      success: true,
      category
    });

  } catch (error) {
    console.error('Get Category Error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error while fetching category'
    });
  }
};

// @desc    Create new category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = async (req, res) => {
  try {
    const { name, description, parent, image } = req.body;

    // If parent is specified, verify it exists and set level
    let level = 0;
    if (parent) {
      const parentCategory = await Category.findById(parent);
      if (!parentCategory) {
        return res.status(400).json({
          success: false,
          error: 'Parent category not found'
        });
      }
      level = parentCategory.level + 1;
    }

    const category = await Category.create({
      name,
      description,
      parent,
      level,
      image
    });

    // Populate parent before response
    await category.populate('parent', 'name slug');

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      category
    });

  } catch (error) {
    console.error('Create Category Error:', error);

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'Category with this name already exists'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error while creating category'
    });
  }
};

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = async (req, res) => {
  try {
    const { name, description, parent, image, isActive } = req.body;

    let category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    // If parent is being updated, verify it exists and update level
    let level = category.level;
    if (parent && parent !== category.parent?.toString()) {
      const parentCategory = await Category.findById(parent);
      if (!parentCategory) {
        return res.status(400).json({
          success: false,
          error: 'Parent category not found'
        });
      }
      level = parentCategory.level + 1;
    }

    category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description, parent, level, image, isActive },
      { new: true, runValidators: true }
    ).populate('parent', 'name slug');

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      category
    });

  } catch (error) {
    console.error('Update Category Error:', error);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error while updating category'
    });
  }
};

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    // Soft delete
    category.isActive = false;
    await category.save();

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully'
    });

  } catch (error) {
    console.error('Delete Category Error:', error);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    res.status(500).json({
      success: false,
      error: 'Server error while deleting category'
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};