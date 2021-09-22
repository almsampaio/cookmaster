const jwt = require('jsonwebtoken');
const UserModel = require('../models/users');

const SECRET = 'aipapai';

const verifyLogin = async (email, password) => {
  const errorObj = {
    code: 401,
    message: 'Incorrect username or password',
  };
  if (!email || !password) {
    return {
      code: 401,
      message: 'All fields must be filled',
    };
  }
  const user = await UserModel.getByEmail(email);
  if (!user) return errorObj;
  if (user.password !== password) return errorObj;
};

const login = async (email, password) => {
  const isValid = await verifyLogin(email, password);
  if (isValid) return isValid;
  const user = await UserModel.getByEmail(email);
  const { password: _, ...userPayload } = user;
  const token = jwt.sign(userPayload, SECRET);
  return { token };
};

module.exports = {
  login,
};
