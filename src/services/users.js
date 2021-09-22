const Joi = require('joi');
const { sign } = require('jsonwebtoken');
const Users = require('../models/users');

const SECRET = 'segredomegasecreto123';

const jwtConfig = {
  expiresIn: '3d',
  algorithm: 'HS256',
};

const loginJoi = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const usersJoi = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const create = async (data) => {
  const { email: emailUser } = data;
  const { error } = usersJoi.validate(data);
  if (error) return { status: 400, err: { message: 'Invalid entries. Try again.' } };

  const getUserEmail = await Users.getUserByEmail(emailUser);
  if (getUserEmail) return { status: 409, err: { message: 'Email already registered' } };

  const { _id, name, email, role } = await Users.create(data);
  return { status: 201, data: { user: { _id, name, email, role } } };
};

const tokenGen = async (data) => {
  const { error } = loginJoi.validate(data);
  if (error) return { status: 401, err: { message: 'All fields must be filled' } };

  const getUserEmail = await Users.getUserByEmail(data.email);
  if (!getUserEmail) return { status: 401, err: { message: 'Incorrect username or password' } };

  const token = sign(getUserEmail, SECRET, jwtConfig);
  return { status: 200, token };
};

module.exports = {
  create,
  tokenGen,
};