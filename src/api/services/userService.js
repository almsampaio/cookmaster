const userModel = require('../models/userModel');
const userSchema = require('../schemas/userSchema');

const create = async (name, email, password, role) => {
  const validations = await userSchema.createUser(name, email, password);
  if (validations.message) return validations;
  
  const user = await userModel.create(name, email, password, role);
  return { status: 201, user };
};

module.exports = {
  create,
};