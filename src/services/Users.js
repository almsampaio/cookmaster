const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

const create = async (name, email, password) => {
  const checkEmail = await Users.getByEmail(email);

  if (checkEmail) {
    return { status: StatusCodes.CONFLICT, message: 'Email already registered' };
  }

  const newUser = await Users.create(name, email, password);
  return { status: StatusCodes.CREATED, data: { user: newUser } };
};

const login = async (email, password) => {
  const getUser = await Users.getByEmail(email);
  const secret = 'topsecrettoken';
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  
  if (!getUser || getUser.password !== password) {
    return { status: StatusCodes.UNAUTHORIZED, message: 'Incorrect username or password' };
  }

  // The following payload as so as getByEmail function, have a huge security gap! The getByEmail returns all the user's info, including the password.
  const token = jwt.sign({ data: getUser }, secret, jwtConfig);
  return { status: StatusCodes.OK, token };
};

module.exports = {
  create,
  login,
};