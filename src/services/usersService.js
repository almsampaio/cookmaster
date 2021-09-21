const Joi = require('joi');
const usersModel = require('../models/usersModel');

const CREATED_STATUS = 201;
const BAD_REQUEST_STATUS = 400;
const CONFLICT_STATUS = 409;
const msg400 = 'Invalid entries. Try again.';
const msg409 = 'Email already registered';

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const register = async (user) => {
  const validateEmail = await usersModel.findByEmail(user);
  const validateUser = userSchema.validate(user);

  if (validateUser.error) {
    return { status: BAD_REQUEST_STATUS, result: { message: msg400 } };
  }

  if (validateEmail) {
    return { status: CONFLICT_STATUS, result: { message: msg409 } };
  }

  const result = await usersModel.userRegistration(user);

  return { status: CREATED_STATUS, result };
};

module.exports = {
  register,
};
