const { body, validationResult } = require('express-validator');

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => {
      return err.msg;
    });

    const message = errorMessages.join('. ');

    return res.status().json({
      status: 'error',
      message,
    });
  }

  next();
};

const createUserValidators = [
  body('userName')
    .isString()
    .withMessage('Name must be a string value')
    .notEmpty()
    .withMessage('UserName cannot be empty')
    .isLength({ min: 4 })
    .withMessage('UserName must include at least 4 characters'),
  body('email')
    .isEmail()
    .withMessage('Email must include email values like @ & .com')
    .notEmpty()
    .withMessage('Email cannot be an empty value'),
  body('password')
    .isString()
    .withMessage('Password must be a string value')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be include at least 8 characters'),
  checkValidations,
];

const createRestaurantValidators = [
  body('name').isString(),
  body('address'),
  body('rating'),
  checkValidations,
];

const createMealValidators = [];
