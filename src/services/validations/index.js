const Validation = require('./constructor');

const usersValidation = require('./usersValidation');
const loginValidation = require('./loginValidation');
const recipesValidation = require('./recipesValidation');

function isNameValid(name) {
  const isNameTrue = new Validation(name);
  isNameTrue.verify('badRequest');
}

module.exports = {
  isNameValid,
  ...usersValidation,
  ...loginValidation,
  ...recipesValidation,
};
