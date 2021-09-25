const { body } = require('express-validator');
const errors = require('../errors');

const validate = (method) => {
  switch (method) {
    case 'createUser': {
      return [
        body('name', errors.invalidEntries).exists().notEmpty().isString(),
        body('email', errors.invalidEntries).exists().notEmpty().isEmail(),
        body('password', errors.invalidEntries).exists().notEmpty().isString(),
      ];
    }
    case 'login': {
      return [
        body('email', errors.isBlankOrNotExists).exists().isEmail().isString(),
        body('password', errors.isBlankOrNotExists).exists().notEmpty().isString(),
      ];
    }
    default:
      return [];
  }
};

module.exports = validate;
