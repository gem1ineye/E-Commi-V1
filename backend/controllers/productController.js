const Product = require("../models/Product");
const Category = require("../models/Category");

// @desc    Get all products with filtering, sorting, pagination
// @route   GET /api/products
// @access  Public
const getAllProducts = async (req, res) => {
  try {
    // Extract query parameters
    const {
      page = 1,
      limit = 12,
      category,
      minPrice,
      maxPrice,
      brand,
      sort = "createdAt",
      order = "desc",
      search,
    } = req.query;

    // Build filter object
    const filter = { isActive: true };

    // Category filter
    if (category) {
      filter.category = category;
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Brand filter
    if (brand) {
      filter.brand = brand;
    }

    // Text search
    if (search) {
      filter.$text = { $search: search };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Sort order
    const sortOrder = order === "asc" ? 1 : -1;
    const sortObj = { [sort]: sortOrder };

    // Execute query
    const products = await Product.find(filter)
      .populate("category", "name slug")
      .sort(sortObj)
      .limit(Number(limit))
      .skip(skip);

    // Get total count for pagination
    const total = await Product.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: Number(page),
      products,
    });
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({
      success: false,
      error: "Server error while fetching products",
    });
  }
};

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category",
      "name slug description",
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error("Get Product Error:", error);

    // Handle invalid ObjectId
    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    res.status(500).json({
      success: false,
      error: "Server error while fetching product",
    });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin (we'll add auth middleware later)
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      compareAtPrice,
      category,
      subcategory,
      brand,
      stock,
      sku,
      variants,
      specifications,
      tags,
      isFeatured,
      images,
    } = req.body;

    console.log('--- CREATE PRODUCT DEBUG ---');
    console.log('Images received:', JSON.stringify(images, null, 2));

    // Check if category exists
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(400).json({
        success: false,
        error: "Invalid category",
      });
    }

    // Create product
    const product = await Product.create({
      name,
      description,
      price,
      compareAtPrice,
      category,
      subcategory,
      brand,
      stock,
      sku,
      variants,
      specifications,
      tags,
      isFeatured,
      images,
    });

    // Populate category before sending response
    await product.populate("category", "name slug");

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create Product Error:", error);

    // Handle duplicate SKU
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Product with this SKU already exists",
      });
    }

    res.status(500).json({
      success: false,
      error: "Server error while creating product",
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      compareAtPrice,
      category,
      subcategory,
      brand,
      stock,
      sku,
      variants,
      specifications,
      tags,
      isFeatured,
      isActive,
      images,
    } = req.body;

    console.log('--- UPDATE PRODUCT DEBUG ---');
    console.log('Images received:', JSON.stringify(images, null, 2));

    // Find product
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    // If category is being updated, verify it exists
    if (category && category !== product.category.toString()) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({
          success: false,
          error: "Invalid category",
        });
      }
    }

    // Update product
    product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        compareAtPrice,
        category,
        subcategory,
        brand,
        stock,
        sku,
        variants,
        specifications,
        tags,
        isFeatured,
        isActive,
        images,
      },
      {
        new: true, // Return updated document
        runValidators: true, // Run schema validators
      },
    ).populate("category", "name slug");

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Update Product Error:", error);

    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    res.status(500).json({
      success: false,
      error: "Server error while updating product",
    });
  }
};

// @desc    Delete product (soft delete)
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    // Soft delete - just set isActive to false
    product.isActive = false;
    await product.save();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete Product Error:", error);

    if (error.kind === "ObjectId") {
      return res.status(404).json({
        success: false,
        error: "Product not found",
      });
    }

    res.status(500).json({
      success: false,
      error: "Server error while deleting product",
    });
  }
};

// @desc    Search products by text
// @route   GET /api/products/search
// @access  Public
const searchProducts = async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        error: "Search query is required",
      });
    }

    const products = await Product.find(
      {
        $text: { $search: q },
        isActive: true,
      },
      { score: { $meta: "textScore" } }, // Include text search score
    )
      .sort({ score: { $meta: "textScore" } }) // Sort by relevance
      .limit(Number(limit))
      .populate("category", "name slug");

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Search Products Error:", error);
    res.status(500).json({
      success: false,
      error: "Server error while searching products",
    });
  }
};

// @desc    Get product reviews
// @route   GET /api/products/:id/reviews
// @access  Public
const getProductReviews = async (req, res) => {
  try {
    const Review = require("../models/Review");
    const reviews = await Review.find({
      product: req.params.id,
      status: 'approved'
    })
      .populate("user", "name avatar")
      .sort("-createdAt");

    res.status(200).json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error("Get Reviews Error:", error);
    res.status(500).json({
      success: false,
      error: "Server error while fetching reviews",
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProducts,
  getProductReviews,
};
