const Joi = require('joi');
const UserModel = require('../models/UserModel');

const userCreateValidate = (user) => Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().pattern(/^\w+@\w+\.com/),
  password: Joi.string().required(),
}).validate(user);

const emailIsUnique = async (email) => {
  const emailFound = await UserModel.findByEmail(email);

  if (emailFound) return { message: 'Email already registered' };

  return {};
};

module.exports = {
  userCreateValidate,
  emailIsUnique,
};