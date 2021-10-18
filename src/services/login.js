const jwt = require('jsonwebtoken');
const modelLogin = require('../models/login');
const validations = require('../schemas/validationsLogin');

const SECRET = 'mysecretultrasecret';

const loginUser = async (email, password) => {
  const userSearch = await modelLogin.searchEmailUser(email);

  const validEmail = validations.validateEmail(email);
  if (validEmail) return { status: 401, data: validEmail };

  const validPassword = validations.validatePassword(password);
  if (validPassword) return { status: 401, data: validPassword };

  const isValidEmail = await validations.verifyEmail(email);
  if (isValidEmail) return { status: 401, data: isValidEmail };

  const { password: _, ...userPayload } = userSearch;

  const token = jwt.sign(userPayload, SECRET);

  return { status: 200, data: { token } };
};

module.exports = {
  loginUser,
};
