const jwt = require('jsonwebtoken');
const uresModel = require('../model/modUsers');

const myKey = 't@nojeito';
const config = { expiresIn: '7d', algorithm: 'HS256' };

const AllFields = {
  status: 401,
  error: {
    message: 'All fields must be filled',
  },
};

const IncorrectUsername = {
  status: 401,
  error: {
    message: 'Incorrect username or password',
  },
};

function validateFields(email, password) {
  if (!email || !password) throw AllFields;
}

function validateCredentials(user, password) {
  if (!user || user.password !== password) throw IncorrectUsername;
}

const makeLogin = async (email, password) => {
  validateFields(email, password);
  const user = await uresModel.getUserByEmail(email);
  validateCredentials(user, password);
  delete user.password;
  const token = jwt.sign({ data: user }, myKey, config);
  return { status: 200, response: { token } };
};

module.exports = {
  makeLogin,
};