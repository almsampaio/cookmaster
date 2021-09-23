const jwt = require('jsonwebtoken');
const users = require('../models/users');
const { userSchema, loginSchema } = require('../helpers/validation.schema');

const secret = 'superseguro123';
const jwtConfig = {
  algorithm: 'HS256',
};

const createUser = async (name, email, password, role) => {
  const { error } = userSchema.validate(email, password, name);
  if (error) return { status: 400, err: { message: 'Invalid entries. Try again.' } };

  const repeatedEmail = await users.findByEmail(email);
  if (repeatedEmail) return { status: 409, err: { message: 'Email already registered' } };

  const data = await users.createUser(name, email, password, role);

  return { status: 201, data };
};

const createToken = async (data) => {
  const { error } = loginSchema.validate(data);
  if (error) return { status: 401, err: { message: 'All fields must be filled' } };

  const findUser = await users.findByEmail(data.email);
  if (!findUser) return { status: 401, err: { message: 'Incorrect username or password' } };

  const token = jwt.sign({ data: findUser }, secret, jwtConfig);
  return { status: 200, token };
};

module.exports = {
  createUser,
  createToken,
};
