'use strict';
const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');
const validationMiddleware = require('../../lib/validationMiddleware');
const filterProducts = require('../../lib/filterProducts');

// GET: /api/products
// Get products
// http://localhost:3000/api/products
router.get('/', validationMiddleware, async (req, res, next) => {
  filterProducts(req, res, next, 'json');
});

// GET: /api/products/tags
// Get all tags
// http://localhost:3000/api/products/tags
router.get('/tags', (req, res, next) => {
  // static model method:
  res.json({ ok: true, allTags: Product.allTags() });
});

// GET: /api/products(_id)
// Get product by id
// http://localhost:3000/api/products/(_id)
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.json({ result: [{ product }] });
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

// PUT: /api/products(_id)
// Update product
// http://localhost:3000/api/products/(_id)
router.put('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updateProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
    });
    res.json({ result: [{ updateProduct }] });
  } catch (err) {
    next(err);
  }
});

//DELETE: /api/products/(_id)
// Delete product
// http://localhost:3000/api/products/(_id)
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    await Product.deleteOne({ _id: id });
    res.json();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
