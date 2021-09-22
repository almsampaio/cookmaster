const Joi = require('joi');
const { sign } = require('jsonwebtoken');
const Users = require('../models/users');

const SECRET = 'Vaitentanto123';
const jwtConfig = {
  expiresIn: '3d',
  algorithm: 'HS256',
};

const schemaUsers = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const schemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const create = async (data) => {
  const { email: emailUser } = data;
  const { error } = schemaUsers.validate(data);
  if (error) return { status: 400, err: { message: 'Invalid entries. Try again.' } };

  const findUserEmail = await Users.getByEmail(emailUser);
  if (findUserEmail) return { status: 409, err: { message: 'Email already registered' } };

  const { password: _, ...user } = await Users.create(data);
  return { status: 201, data: { user } };
};

const generetorToken = async (data) => {
  const { error } = schemaLogin.validate(data);
  if (error) return { status: 401, err: { message: 'All fields must be filled' } };
  
  const findUser = await Users.getByEmail(data.email);
  if (!findUser) return { status: 401, err: { message: 'Incorrect username or password' } };

  const token = sign({ data: findUser }, SECRET, jwtConfig);
  return { status: 200, token };
};

module.exports = {
  create,
  generetorToken,
};