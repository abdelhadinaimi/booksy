import { query, validationResult, param, body } from 'express-validator';

export const bookSearchValidations = [
  query('q')
    .notEmpty(),
  query('startIndex')
    .optional()
    .isInt({ min: 0 }),
  query('maxResults')
    .optional()
    .isInt({ min: 0, max: 40 }),
  query('orderBy')
    .optional()
    .isString()
    .matches(/^newest|relevance$/),
];

export const getBookValidations = [
  param('bookId')
    .notEmpty()
    .isLength({ max: 12, min: 12 }),
  param('rid')
    .optional(),
  param('short')
    .optional()
    .isBoolean()
    .toBoolean(),
];

export const reviewValidations = [
  body('rating')
    .isInt({ min: 0, max: 5 }),
  body('reviewText')
    .optional()
    .isLength({ max: 1000 }),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = [];
    errors.array().map(e => errorMessages.push({ param: e.param, message: e.msg, value: e.value }));
    return res.status(422).json({ errors: errorMessages });
  }
  next();
};

export const bookshelfValidations = [
  body('name')
    .notEmpty()
    .isLength({ max: 32, min: 3 }),
];
