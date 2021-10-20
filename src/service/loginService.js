const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const usersModel = require('../model/userModel');
const { validateError } = require('./errorValidate');

const secret = 'secretToken';

const validationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateLogin = async (user) => {
  if (!user.email || !user.password) throw validateError(401, 'All fields must be filled');

  const { error } = validationSchema.validate(user);
  const foundEmail = await usersModel.searchEmail(user.email);
  if (error || foundEmail === null) throw validateError(401, 'Incorrect username or password');

  const jwtSettings = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: foundEmail }, secret, jwtSettings);
  return token;
};

module.exports = { validateLogin };