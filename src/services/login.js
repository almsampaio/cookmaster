const jwt = require('jsonwebtoken');
const modelUsers = require('../models/users');
const validations = require('../schemas/validationsLogin');

const SECRET = 'mypassword';

const loginUser = async (email, _password) => {
  const validateEmail = await validations.validateEmail(email);
  if (validateEmail) return { status: 401, data: validateEmail };

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
