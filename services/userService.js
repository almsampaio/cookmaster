const { sign } = require('jsonwebtoken');
const userModel = require('../models/userModel');

const SECRET = 'weAllMustKnowHowToUseEnvironmentVariables';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const createNewUser = async (user) => {
  const result = await userModel.createUser(user);
  return result;
};

const login = async (data) => {
  const user = await userModel.findOnebyEmail(data.email);
  const { password: _, ...userWithoutPassword } = user;
  const token = sign({ userWithoutPassword }, SECRET, jwtConfig);
  return { token };
};

module.exports = {
  createNewUser,
  login,
};