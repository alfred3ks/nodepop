'use strict';
const express = require('express');
const router = express.Router();
const validationMiddleware = require('../lib/validationMiddleware');
const filterProductsFrontend = require('../lib/filterProductsFrontd');

/* GET home page. */
// http://localhost:3000
router.get('/', validationMiddleware, (req, res, next) => {
  filterProductsFrontend(req, res, next);
});

module.exports = router;
