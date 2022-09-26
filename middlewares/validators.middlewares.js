const { body, validationResult } = require('express-validator');

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);

    const message = errorMessages.join('. ');

    return res.status(400).json({
      status: 'error',
      message,
    });
  }

  next();
};

const createUserValidators = [
  body('name')
    .isString()
    .withMessage('Name must be a text value')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ min: 4 })
    .withMessage('Name must include at least 4 characters'),
  body('email')
    .isEmail()
    .withMessage('Email must include email values like @ & .com')
    .notEmpty()
    .withMessage('Email cannot be an empty value'),
  body('password')
    .isString()
    .withMessage('Password must be a text value')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be include at least 8 characters'),
  body('role')
    .isString()
    .withMessage('Role must be a text value')
    .notEmpty()
    .withMessage('Role can not be an empty value'),
  checkValidations,
];

const createRestaurantValidators = [
  body('name')
    .isString()
    .withMessage('Name must be a text value')
    .notEmpty()
    .withMessage('Name can not be an empty value'),
  body('address')
    .isString()
    .withMessage('Address must be a text value')
    .notEmpty()
    .withMessage('Address can not be an empty value')
    .isLength({ min: 20 })
    .withMessage('Address must include at least 20 characters'),
  body('rating')
    .isNumeric()
    .withMessage('Rating must be a numeric value')
    .notEmpty()
    .withMessage('Rating can not be an empty value'),
  checkValidations,
];

const createMealValidators = [
  body('name')
    .isString()
    .withMessage('Name must be a text value')
    .notEmpty()
    .withMessage('Name can not be empty')
    .isLength({ min: 3 })
    .withMessage('Name must include at least 3 characters'),
  body('price')
    .isNumeric()
    .withMessage('Price must be a numeric value')
    .notEmpty()
    .withMessage('Price can not be an empty value'),
  checkValidations,
];

module.exports = {
  createUserValidators,
  createRestaurantValidators,
  createMealValidators,
};
