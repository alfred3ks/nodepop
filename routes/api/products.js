'use strict';
const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');

// GET: /api/products
// Get products
// http://localhost:3000/api/products

router.get('/', async (req, res, next) => {
  try {
    // Filters:
    const filterByName = req.query.name;
    const filterBySale = req.query.sale;
    const filterByPrice = req.query.price;
    const filterByTag = req.query.tag;
    const { minPrice, maxPrice } = req.query;
    console.log(minPrice, maxPrice);

    // pagination:
    //http://localhost:3000/api/products?skip=0&limit=10
    //http://localhost:3000/api/products?skip=20&limit=20
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;

    // Ordenamos:
    // http://localhost:3000/api/products?sort=name
    // http://localhost:3000/api/products?sort=price
    const sort = req.query.sort;

    // http://localhost:3000/api/products?fields=name
    const fields = req.query.fields;
    console.log(fields);

    const filter = {};

    // http://localhost:3000/api/products?name=b
    // http://localhost:3000/api/products?name=bicycle
    if (filterByName !== undefined) {
      // Con el modificador i hace la busqueda sin importar si es mayus o minuscula
      filter.name = { $regex: `^${filterByName}`, $options: 'i' };
    }

    // http://localhost:3000/api/products?price=300
    if (filterBySale !== undefined) {
      filter.sale = filterBySale;
    }

    // Filtro por precio exacto:
    if (filterByPrice !== undefined) {
      filter.price = filterByPrice;
    }

    // Greater than that price
    // http://localhost:3000/api/products?minPrice=100&maxPrice=1500
    // http://localhost:3000/api/products?minPrice=100
    // http://localhost:3000/api/products?maxPrice=1500
    if (minPrice !== undefined && maxPrice !== undefined) {
      // Buscar productos en el rango especificado
      filter.price = {
        $gte: minPrice,
        $lte: maxPrice,
      };
    } else if (minPrice !== undefined) {
      // Buscar productos con precio menor al valor dado
      filter.price = {
        $lt: minPrice,
      };
    } else if (maxPrice !== undefined) {
      // Buscar productos con precio mayor al valor dado
      filter.price = {
        $gt: maxPrice,
      };
    }

    //http://localhost:3000/api/products?tag=mobile
    if (filterByTag !== undefined) {
      filter.tags = { $in: [filterByTag] };
    }

    const products = await Product.list(filter, skip, limit, sort, fields);
    res.json({ result: [{ products }] });
  } catch (err) {
    next(err);
  }
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
