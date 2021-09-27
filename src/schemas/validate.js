// const { body } = require('express-validator');
const errors = require('../errors');

// const validate = {
//   createUser: () => [
//     body('name', errors.invalidEntries).exists().notEmpty().isString(),
//     body('email', errors.invalidEntries).exists().notEmpty().isEmail(),
//     body('password', errors.invalidEntries).exists().notEmpty().isString(),
//   ],
//   login: () => [
//     body('email', errors.isBlankOrNotExists).exists().isEmail().notEmpty(),
//     body('password', errors.isBlankOrNotExists).exists().notEmpty().isString(),
//   ],
//   createRecipe: () => [
//     body('name', errors.invalidEntries).exists().notEmpty().isString(),
//     body('ingredients', errors.invalidEntries).exists().isString(),
//     body('preparation', errors.invalidEntries).exists().notEmpty().isString(),
//   ],
// };

const validate = {
  createUser: (name, email, password) => {
    const validEmail = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const validations = [
      validEmail,
      !!name,
      !!email,
      !!password,
      typeof name === 'string',
      typeof password === 'string',
    ];
    if (validations.includes(false)) {
      return { message: errors.invalidEntries };
    }
    return true;
  },
  login: (email, password) => {
    const validEmail = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const validations = [
      validEmail,
      !!email,
      !!password,
      typeof password === 'string',
    ];
    if (validations.includes(false)) {
      return { message: errors.isBlankOrNotExists };
    }
    return true;
  },
  createRecipe: (name, ingredients, preparation) => {
    const validations = [
      !!name,
      !!ingredients,
      !!preparation,
      typeof name === 'string',
      typeof ingredients === 'string',
      typeof preparation === 'string',
    ];
    if (validations.includes(false)) {
      return { message: errors.invalidEntries };
    }
    return true;
  },
};

module.exports = validate;
