const jwt = require('jsonwebtoken');

const usersModel = require('../models/usersModel');

const emailMessage = 'Email already registered';
const loginMessage = 'Incorrect username or password';

const SECRET = 'segredinhosecreto';
const jwtConfig = { expiresIn: '1h', algorithm: 'HS256' };

const create = async (newUser) => {
  // console.log(error);
  const emailAlreadyRegistered = await usersModel.findByEmail(newUser.email);

  if (emailAlreadyRegistered) return { code: 409, message: emailMessage };

  const user = await usersModel.create(newUser);

  return user;
};

const userLogin = async (login) => {
  const user = await usersModel.findByEmail(login.email);

  if (!user || user.password !== login.password) {
    return {
      code: 401,
      message: loginMessage,
    };
  }

  const { password: _, name, ...payload } = user;

  const token = jwt.sign(payload, SECRET, jwtConfig);

  return token;
};

module.exports = {
  create,
  userLogin,
};