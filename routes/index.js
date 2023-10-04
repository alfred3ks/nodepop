'use strict';
const express = require('express');
const router = express.Router();
const validationMiddleware = require('../lib/validationMiddleware');
const filterProducts = require('../lib/filterProducts');

/* GET home page. */
// http://localhost:3000
router.get('/', validationMiddleware, (req, res, next) => {
  filterProducts(req, res, next, 'view');
});

module.exports = router;
