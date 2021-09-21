const jwt = require('jsonwebtoken');

const loginModel = require('../Models/loginModel');
const { loginValidations } = require('../helpers/loginValidations');

const HTTP_STATUS_UNAUTHORIZED = 401;
const HTTP_STATUS_OK = 200;
const ERROR_MESSAGE = 'Incorrect username or password';

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const secret = 'secret';

const userLogin = async (email, password) => {
  const validate = loginValidations(email, password);

  if (validate) {
    return validate;
  }

  const userExists = await loginModel.checkUserExists(email);
  if (!userExists || userExists.password !== password) {
    return ({
      code: HTTP_STATUS_UNAUTHORIZED,
      message: ERROR_MESSAGE,
      });
  }
  const { password: _, ...userWithoutPassword } = userExists;
  const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);

  return ({
    code: HTTP_STATUS_OK,
    token,
    });
};

module.exports = {
  userLogin,
};