'use strict';
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

/* GET home page. */
// http://localhost:3000
router.get('/', async (req, res, next) => {
  try {
    // Filters:
    // localhost:3000/?name=iPhone%2014
    // localhost:3000/?sale=true
    const filterByName = req.query.name;
    const filterBySale = req.query.sale;
    const filterByPrice = req.query.price;
    const { minPrice, maxPrice } = req.query;
    const filterByTag = req.query.tag;

    // pagination:
    //http://localhost:3000/?skip=0&limit=10
    //http://localhost:3000/?skip=10&limit=20
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 10;

    // order:
    // http://localhost:3000?sort=name
    // http://localhost:3000?sort=-name
    // http://localhost:3000?sort=price
    // http://localhost:3000?sort=-price
    const sort = req.query.sort;

    // search by field
    // http://localhost:3000/?fields=name
    // http://localhost:3000/?fields=price
    // http://localhost:3000/?fields=tags
    const fields = req.query.fields;

    const filter = {};

    // http://localhost:3000/?name=b
    // http://localhost:3000/?name=bicycle
    if (filterByName !== undefined) {
      // With the i modifier you do the search regardless of whether it is uppercase or lowercase
      filter.name = { $regex: `^${filterByName}`, $options: 'i' };
    }

    // http://localhost:3000/?sale=yes
    // http://localhost:3000/?sale=no
    if (filterBySale === 'yes' || filterBySale === 'no') {
      filter.sale = filterBySale;
    }

    // http://localhost:3000/api/products?price=499
    // Filtro por precio exacto:
    if (filterByPrice !== undefined) {
      filter.price = filterByPrice;
    }

    // Greater than that price
    // http://localhost:3000/?minPrice=100&maxPrice=1500
    // http://localhost:3000/?minPrice=100
    // http://localhost:3000/?maxPrice=1500
    if (minPrice !== undefined && maxPrice !== undefined) {
      // products in the specified range
      filter.price = {
        $gte: minPrice,
        $lte: maxPrice,
      };
    } else if (minPrice !== undefined) {
      // Search for products with a price lower than the given value
      filter.price = {
        $lt: minPrice,
      };
    } else if (maxPrice !== undefined) {
      // Search for products with a price higher than the given value
      filter.price = {
        $gt: maxPrice,
      };
    }

    //http://localhost:3000/?tag=mobile
    if (filterByTag !== undefined) {
      filter.tags = { $in: [filterByTag] };
    }

    const products = await Product.list(filter, skip, limit, sort, fields);

    res.render('products', { products, fields });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
