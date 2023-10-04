'use strict';
const Product = require('../models/Product');
const { validationResult } = require('express-validator');

async function filterProducts(req, res, next, responseType) {
  try {
    validationResult(req).throw();

    const filterByName = req.query.name;
    const filterBySale = req.query.sale;
    const filterByPrice = req.query.price;
    const filterByTag = req.query.tag;
    const { minPrice, maxPrice } = req.query;

    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;

    const sort = req.query.sort;
    const fields = req.query.fields;

    const filter = {};

    if (filterByName !== undefined) {
      filter.name = { $regex: `^${filterByName}`, $options: 'i' };
    }

    if (filterBySale === 'yes' || filterBySale === 'no') {
      filter.sale = filterBySale;
    }

    if (filterByPrice !== undefined) {
      filter.price = filterByPrice;
    }

    if (minPrice !== undefined && maxPrice !== undefined) {
      filter.price = {
        $gte: minPrice,
        $lte: maxPrice,
      };
    } else if (minPrice !== undefined) {
      filter.price = {
        $lt: minPrice,
      };
    } else if (maxPrice !== undefined) {
      filter.price = {
        $gt: maxPrice,
      };
    }

    if (filterByTag !== undefined) {
      filter.tags = { $in: [filterByTag] };
    }

    const products = await Product.list(filter, skip, limit, sort, fields);

    if (responseType === 'json') {
      res.json({ result: [{ products }] });
    } else if (responseType === 'view') {
      res.render('index', { products, fields });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = filterProducts;

// // GET: /api/products
// router.get('/', validationMiddleware, (req, res, next) => {
//   listProducts(req, res, next, 'json');
// });
