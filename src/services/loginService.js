const jwt = require('jsonwebtoken');
const usersModel = require('../models/usersModel');

const secret = 'bem-te-vi';

const jwtConfig = {
  expiresIn: '30m',
  algorithm: 'HS256',
};

const validateLogin = async (email, password) => {
  const user = await usersModel.findUser(email);

  if (!user) {
    return ({ status: 401, message: 'Incorrect username or password' });
  }
  if (user.password !== password) {
    return ({ status: 401, message: 'Incorrect username or password' });
  }
};

const loginUser = async (email, password) => {
  if (!email || !password) {
    return ({ status: 401, message: 'All fields must be filled' });
  }

  const emailValidate = await validateLogin(email, password);
  if (emailValidate) return emailValidate;

  const { password: passDB, ...userInformation } = await usersModel.findUser(email);
  const token = jwt.sign({ data: userInformation }, secret, jwtConfig);

  return ({ status: 200, message: token });
};

module.exports = {
  loginUser,
};
