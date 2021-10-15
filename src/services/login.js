const jwt = require('jsonwebtoken');
const modelUsers = require('../models/users');
const validations = require('../schemas/validationsLogin');

const SECRET = 'mypassword';

const loginUser = async (email, password) => {
  const validateEmail = await validations.validateEmail(email);
  if (validateEmail) return { status: 401, data: validateEmail };

  const validatePassword = await validations.validatePassword(password);
  if (validatePassword) return { status: 401, data: validatePassword };

  const verifyEmail = await validations.verifyEmail(email);
  if (verifyEmail) return { status: 401, data: verifyEmail };

  const searchUser = await modelUsers.getAll();
  const { password: _, ...userPayload } = searchUser;
  const token = jwt.sign(
    userPayload,
    SECRET,
  );
  return { status: 200, data: { token } };
};

module.exports = {
  loginUser,
};
