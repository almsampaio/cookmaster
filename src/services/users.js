const jwt = require('jsonwebtoken');
const users = require('../models/users');

const secret = 'superseguro123';
const jwtConfig = {
  algorithm: 'HS256',
};

const OK_STATUS = 200;
const CREATED_STATUS = 201;
const UNAUTHORIZED_STATUS = 401;
const CONFLICT_STATUS = 409;

const createUser = async (name, email, password, role) => {
  const repeatedEmail = await users.findByEmail(email);
  if (repeatedEmail) {
    return {
      status: CONFLICT_STATUS, message: 'Email already registered',
    }; 
}

  const data = await users.createUser(name, email, password, role);

  return { status: CREATED_STATUS, data };
};

const createToken = async (data) => {
  const findUser = await users.findByEmail(data);
  if (!findUser) {
    return {
      status: UNAUTHORIZED_STATUS, message: 'Incorrect username or password',
    }; 
}
  const { _id, email, role } = findUser;
  const token = jwt.sign({ _id, email, role }, secret, jwtConfig);
  return { status: OK_STATUS, token };
};

module.exports = {
  createUser,
  createToken,
};
