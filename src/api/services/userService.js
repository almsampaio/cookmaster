const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const userSchema = require('../schemas/userSchema');

const create = async (name, email, password, role) => {
  const validations = await userSchema.createUser(name, email, password);
  if (validations.message) return validations;
  
  const user = await userModel.create(name, email, password, role);
  return { status: 201, user };
};

const findByCredentials = async (email, password) => {
  const validations = await userSchema.validateLogin(email, password);
  if (validations.message) return validations;

  const SECRET = 'itsASecretAndIllNeverTellYou';

  const user = await userModel.findByCredentials(email);
  const { password: _, ...userPayload } = user;

  const token = jwt.sign(userPayload, SECRET);
  return { status: 200, token };
};

module.exports = {
  create,
  findByCredentials,
};