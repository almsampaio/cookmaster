const validations = require('./validations');

const postUsers = async ({ name, email, password }) => {
  const validateInsertedBodyError = validations.validateBodyUsers({ name, email, password });
  if (validateInsertedBodyError) return validateInsertedBodyError;
};

module.exports = {
  postUsers,
};
