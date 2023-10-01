'use strict';

const mongoose = require('mongoose');

// Schema to control the data that goes to the DB:
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    onSale: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      required: true,
      index: true,
    },
    photo: {
      type: String,
    },
    tags: {
      type: [String],
      index: true,
    },
  },
  // control the pluralization of mongoose
  { collection: 'products' }
);

// Create a model from the schematic
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
