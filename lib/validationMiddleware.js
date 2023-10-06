const { query } = require('express-validator');

const validationMiddleware = [
  // Validate 'price' query parameter (optional, numeric)
  query('price').optional().isNumeric().withMessage('it must be a number'),
  // Validate 'minPrice' query parameter (optional, numeric)
  query('minPrice').optional().isNumeric().withMessage('it must be a number'),
  // Validate 'maxPrice' query parameter (optional, numeric)
  query('maxPrice').optional().isNumeric().withMessage('it must be a number'),
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
