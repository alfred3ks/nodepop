const { query } = require('express-validator');

const validationMiddleware = [
  // Validate 'name' query parameter (optional, string)
  // query('name').optional().isString().withMessage('must be a string'),
  // Validate 'sale' query parameter (optional, string)
  // query('sale').optional().isString().withMessage('must be a string'),
  // Validate 'price' query parameter (optional, numeric)
  query('price').optional().isNumeric().withMessage('it must be a number'),
  // Validate 'minPrice' query parameter (optional, numeric)
  query('minPrice').optional().isNumeric().withMessage('it must be a number'),
  // Validate 'maxPrice' query parameter (optional, numeric)
  query('maxPrice').optional().isNumeric().withMessage('it must be a number'),
  // Validate 'tag' query parameter (optional, string)
  // query('tag').optional().isString().withMessage('must be a string'),
  // Validate 'skip' query parameter (optional, numeric)
  query('skip').optional().isNumeric().withMessage('it must be a number'),
  // Validate 'limit' query parameter (optional, numeric)
  query('limit').optional().isNumeric().withMessage('it must be a number'),
  // Validate 'sort' query parameter (optional, string)
  query('sort').optional().isString().withMessage('it must be a number'),
  // Validate 'fields' query parameter (optional, string)
  query('fields').optional().isString().withMessage('it must be a number'),
];

module.exports = validationMiddleware;
