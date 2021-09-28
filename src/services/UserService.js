const Joi = require('joi');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const schemaUserLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.required(),
});

const schemaUser = Joi.object({
  name: Joi.required(),
  email: Joi.string().email().required(),
  password: Joi.required(),
});

/* Source: https://github.com/tryber/sd-09-cookmaster-v2/tree/Henrique-Moura-cookmaster */
const errorHandling = (status, message) => ({
  status,
  message,
});

/* Source: https://github.com/tryber/sd-09-cookmaster-v2/tree/Henrique-Moura-cookmaster */
const create = async (name, email, password) => {
  const getByEmail = await UserModel.getByEmail(email);

  if (getByEmail) throw errorHandling(409, 'Email already registered');

  const { error } = schemaUser.validate({ name, email, password });

  if (error) throw errorHandling(400, 'Invalid entries. Try again.');

  const user = await UserModel.create(name, email, password);

  return user;
};

/* Source: https://github.com/tryber/sd-09-cookmaster-v2/tree/Henrique-Moura-cookmaster */
const userLogin = async (email, password) => {
  const secret = 'mateus';
  const { error } = schemaUserLogin.validate({ email, password });

  if (error) throw errorHandling(401, 'All fields must be filled');

  const user = await UserModel.userLogin(email, password);

  if (!user) throw errorHandling(401, 'Incorrect username or password');

  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
  const { password: _, ...userWithoutPassword } = user;
  const token = jwt.sign(userWithoutPassword, secret, jwtConfig);

  return token;
};

module.exports = {
  create,
  userLogin,
};