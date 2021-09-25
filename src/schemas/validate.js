const { body } = require('express-validator');
const errors = require('../errors');

const validate = {
  createUser: () => [
    body('name', errors.invalidEntries).exists().notEmpty().isString(),
    body('email', errors.invalidEntries).exists().notEmpty().isEmail(),
    body('password', errors.invalidEntries).exists().notEmpty().isString(),
  ],
  login: () => [
    body('email', errors.isBlankOrNotExists).exists().isEmail().notEmpty(),
    body('password', errors.isBlankOrNotExists).exists().notEmpty().isString(),
  ],
  createRecipe: () => [
    body('name', errors.invalidEntries).exists().notEmpty().isString(),
    body('ingredients', errors.invalidEntries).exists().isString(),
    body('preparation', errors.invalidEntries).exists().notEmpty().isString(),
  ],
};

module.exports = validate;
