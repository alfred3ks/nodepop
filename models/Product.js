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
    sale: {
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
    owner: { ref: 'User', type: mongoose.Schema.Types.ObjectId },
  },
  // control the pluralization of mongoose
  { collection: 'products' }
);

// static method for filters:
productSchema.statics.list = function (filter, skip, limit, sort, fields) {
  // filters:
  const query = Product.find(filter);
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);

  return query.exec();
};

// Static method for all tags:
productSchema.statics.allTags = function () {
  return ['motor', 'lifestyle', 'mobile', 'work'];
};

// Create a model from the schematic
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
