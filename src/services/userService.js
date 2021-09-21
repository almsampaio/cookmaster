const userModel = require('../models/userModel');
const userValidations = require('../validations/userValidations');

const createUser = async (name, email, password, role) => {
  const validations = await userValidations.validate(name, email, password);
  if (validations.message) return validations;

  const user = await userModel.createUser(name, email, password, role);
  return { user };
};

module.exports = { createUser };