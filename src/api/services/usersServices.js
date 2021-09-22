const jwt = require('jsonwebtoken');
const usersModel = require('../model/usersModel');
const { CREATED } = require('../utils/status');

const create = async (user) => {
  const createUser = await usersModel.create(user);
  return {
    status: CREATED,
    message: createUser,
  };
};

const getByEmail = async (email) => {
  const testEmail = await usersModel.getByEmail(email);
  return testEmail;
};

const generateToken = async (email) => {
  const user = getByEmail(email);
  const secret = 'secret';
  const jwtConfig = {
    algorithm: 'HS256',
  };
  const token = jwt.sign({ data: user }, secret, jwtConfig);
  return token;
};

module.exports = { create, getByEmail, generateToken };
