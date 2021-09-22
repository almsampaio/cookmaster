const jwt = require('jsonwebtoken');

const usersModels = require('../models/users');
const validations = require('./validations');

const JWT_SECRET = 'meuSegredo';

const createUsers = async ({ name, email, password }) => {
  const validateInsertedBodyError = validations
    .validateBodyCreateUsers({ name, email, password });
  if (validateInsertedBodyError) return validateInsertedBodyError;

  const validateSingleUserEmailError = await validations
    .validateSingleUserEmail(email);
  if (validateSingleUserEmailError) return validateSingleUserEmailError;

  return usersModels.createUsers({ name, email, password });
};

const loginUsers = async ({ email, password }) => {
  const validateInsertedBodyError = await validations
    .validateBodyLoginUsers({ email, password });
  if (validateInsertedBodyError) return validateInsertedBodyError;

  // const validateSingleUserEmailError = await validations
  //   .validateSingleUserEmail(email);
  // if (validateSingleUserEmailError) return validateSingleUserEmailError;
  const userLogaded = await usersModels.createUsers({ email, password });
  const { user } = userLogaded;
  const token = jwt.sign(user, JWT_SECRET);

  return token;
};

module.exports = {
  createUsers,
  loginUsers,
};
