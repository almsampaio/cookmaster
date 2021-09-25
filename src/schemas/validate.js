const { body } = require('express-validator');
const errors = require('../errors');

const validate = (method) => {
  switch (method) {
    case 'createUser': {
      return [
        body('name', errors.invalidEntries).exists().notEmpty().isString(),
        body('email', errors.invalidEntries).exists().isEmail().isString(),
        body('password', errors.invalidEntries).exists().notEmpty().isString(),
      ];
    }
    default:
      return [];
  }
};

module.exports = validate;
