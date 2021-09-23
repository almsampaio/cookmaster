const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const Validation = require('./constructor');

const usersValidation = require('./usersValidation');
const loginValidation = require('./loginValidation');
const recipesValidation = require('./recipesValidation');

const SECRET = 'creatingtoken';

function isNameValid(name) {
  const isNameTrue = new Validation(name);
  isNameTrue.verify('badRequest');
}

function isIdValid(id, customMessage) {
  const isObjectIdValid = new Validation(ObjectId.isValid(id));
  isObjectIdValid.verify('notFound', customMessage);
}

function isTokenValid(token) {
  const invalidMessage = 'jwt malformed';
  const missingMessage = 'missing auth token';

  const isTokenTrue = new Validation(!!token);
  isTokenTrue.verify('unauthorized', missingMessage);  

  try {
    const decode = jwt.verify(token, SECRET);
    return decode;
  } catch (_err) {
    const throwTokenError = new Validation(false);
    throwTokenError.verify('unauthorized', invalidMessage);
  }
}

module.exports = {
  isNameValid,
  isIdValid,
  isTokenValid,
  ...usersValidation,
  ...loginValidation,
  ...recipesValidation,
};
