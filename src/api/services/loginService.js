const Joi = require('joi');
const JWT = require('jsonwebtoken');
const IncorrectUsernameOrPassword = require('../errors/IncorrectUsernameOrPassword');
const UserModel = require('../models/UserModel');

const JWT_SECRET = 'xablauxableisliroleibo';
const jwtConfiguration = {
  expiresIn: '15m',
  algorithm: 'HS256',
};

const loginAllFieldsSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const validEmailSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const authenticate = async (user) => {
  const userLogin = await new UserModel().findOneByQuery(user);
  if (userLogin === null) throw new IncorrectUsernameOrPassword();

  const { password, ...userInfo } = userLogin;
  const token = JWT.sign(userInfo, JWT_SECRET, jwtConfiguration);
  return token;
};

const getUserIdAuthenticate = (req) => {
  const { userAuthenticate: { _id: userId } } = req;
  return { userId };
};

const getUserRoleAuthenticate = (req) => {
  const { userAuthenticate: { role: userRole } } = req;
  return { userRole };
};

module.exports = {
  loginAllFieldsSchema,
  validEmailSchema,
  authenticate,
  getUserIdAuthenticate,
  getUserRoleAuthenticate,
  JWT_SECRET,
};
