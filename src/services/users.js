const { sign } = require('jsonwebtoken');
const Schema = require('../utils/schema');
const Users = require('../models/users');
const { SECRET, jwtConfig } = require('../data');

const create = async (data) => {
  const { error } = Schema.schemaUsers.validate(data);
  if (error) return { status: 400, err: { message: 'Invalid entries. Try again.' } };

  const findUserEmail = await Users.getByEmail(data.email);
  if (findUserEmail) return { status: 409, err: { message: 'Email already registered' } };

  const { password: _, ...user } = await Users.create(data);
  return { status: 201, data: { user } };
};

const generetorToken = async (data) => {
  const { error } = Schema.schemaLogin.validate(data);
  if (error) return { status: 401, err: { message: 'All fields must be filled' } };
  
  const findUser = await Users.getByEmail(data.email);
  if (!findUser) return { status: 401, err: { message: 'Incorrect username or password' } };

  const token = sign({ data: findUser }, SECRET, jwtConfig);
  return { status: 200, token };
};

const createAdmin = async (data) => {
  const { error } = Schema.schemaUsers.validate(data);
  if (error) return { status: 401, err: { message: 'All fields must be filled' } };

  const findUserEmail = await Users.getByEmail(data.email);
  if (findUserEmail) return { status: 409, err: { message: 'Email already registered' } };

  const { password: _, ...user } = await Users.createAdmin(data);
  return { status: 201, data: { user } };
};

module.exports = {
  create,
  generetorToken,
  createAdmin,
};