const jwt = require('jsonwebtoken');
const userModel = require('../models/usersModel');
const ERRORS = require('../utils/loginErrors');

const SECRET = '5UP3R53CR374';

const login = async (email, password) => {
  if (!email || !password) return ERRORS.ALL_FIELDS_REQUIRED;
  
  const user = await userModel.findUser(email);
  
  if (!user || password !== user.password) return ERRORS.INCORRECT_LOGIN_OR_PASSWORD;

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, SECRET, jwtConfig);

  return token;
};

module.exports = {
  login,
};
