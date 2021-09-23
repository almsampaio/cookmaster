const Joi = require('joi');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const schemaUser = Joi.object({
  name: Joi.required(),
  email: Joi.string().email().required(),
  password: Joi.required(),
});

const schemaUserLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.required(),
});

const errorHandling = (status, message) => ({
  status,
  message,
});

const secret = 'mateus';

const create = async (name, email, password) => {
  const getByEmail = await UserModel.getByEmail(email);

  if (getByEmail) throw errorHandling(409, 'Email already registered');

  const { error } = schemaUser.validate({ name, email, password });

  if (error) throw errorHandling(400, 'Invalid entries. Try again.');

  const user = await UserModel.create(name, email, password);

  return user;
};

const userLogin = async (email, password) => {
  const { error } = schemaUserLogin.validate({ email, password });

  if (error) throw errorHandling(401, 'All fields must be filled');

  const user = await UserModel.userLogin(email, password);

  if (!user) throw errorHandling(401, 'Incorrect username or password');

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, secret, jwtConfig);

  return token;
};

module.exports = {
  create,
  userLogin,
};