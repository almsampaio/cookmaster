const usersModels = require('../models/users');
const validations = require('./validations');

const postUsers = async ({ name, email, password }) => {
  const validateInsertedBodyError = validations.validateBodyUsers({ name, email, password });
  if (validateInsertedBodyError) return validateInsertedBodyError;

  return usersModels.postUsers({ name, email, password });
};

module.exports = {
  postUsers,
};
