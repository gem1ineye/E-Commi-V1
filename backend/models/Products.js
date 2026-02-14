const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, unique: true, lowercase: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  compareAtPrice: { type: Number, min: 0 },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  subcategory: { type: String },
  brand: { type: String },
  images: [{ url: String, alt: String }],
  stock: { type: Number, required: true, min: 0, default: 0 },
  sku: { type: String, unique: true },
  ratings: {
    average: { type: Number, default: 0, min: 0, max: 5 },
    count: { type: Number, default: 0 }
  },
  variants: [{
    name: String,
    options: [String]
  }],
  specifications: [{
    key: String,
    value: String
  }],
  tags: [String],
  isActive: { type: Boolean, default: true },
}, { timestamps: true });
