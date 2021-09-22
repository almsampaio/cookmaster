const usersModels = require('../models/users');
const validations = require('./validations');

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
  const validateInsertedBodyError = validations
    .validateBodyLoginUsers({ email, password });
  if (validateInsertedBodyError) return validateInsertedBodyError;

  // const validateSingleUserEmailError = await validations
  //   .validateSingleUserEmail(email);
  // if (validateSingleUserEmailError) return validateSingleUserEmailError;

  return usersModels.createUsers({ email, password });
};

module.exports = {
  createUsers,
  loginUsers,
};
