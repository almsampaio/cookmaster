const jwt = require('jsonwebtoken');

const usersModels = require('../models/users');
const validations = require('./validations');

const JWT_SECRET = 'meuSegredo';

const createUsers = async ({ name, email, password }) => {
  const validateInsertedBodyError = validations
    .validateBodyCreateUsers({ name, email, password });
  if (validateInsertedBodyError) return validateInsertedBodyError;

  const validateAlreadyExistsUserByEmailError = await validations
    .validateAlreadyExistsUserByEmail(email, 'createUsers');
  if (validateAlreadyExistsUserByEmailError) return validateAlreadyExistsUserByEmailError;

  return usersModels.createUsers({ name, email, password });
};

const loginUsers = async ({ email, password }) => {
  const validateInsertedBodyError = await validations
    .validateBodyLoginUsers({ email, password });
  if (validateInsertedBodyError.error) return validateInsertedBodyError;

  const { user } = validateInsertedBodyError;
  const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });

  return token;
};

module.exports = {
  createUsers,
  loginUsers,
};
