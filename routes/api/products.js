'use strict';
const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');

// GET: /api/products
// Get products
// http://localhost:3000/api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json({ result: [{ products }] });
  } catch (err) {
    next(err);
  }
});

// POST: /api/products/
// Create a product:
// http://localhost:3000/api/products
router.post('/', async (req, res, next) => {
  try {
    const productData = req.body;
    // create an agent instance in memory:
    const product = new Product(productData);
    // save in the DB
    const productSaved = await product.save();

    res.json({ results: { productSaved } });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
