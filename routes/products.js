'use strict';
const express = require('express');
const router = express.Router();

// Importo la lista de productos en json():
const list = require('../products.json');
const products = list.products;

router.get('/', (req, res, next) => {
  res.render('products', { title: 'Products', products });
});

module.exports = router;
