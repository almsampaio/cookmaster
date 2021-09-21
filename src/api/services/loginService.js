const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const SECRET = 'minhasenhamuitobraba123';

const error = {
  error: {
    message: 'Incorrect username or password',
    code: 401,
  },
};

const signIn = async ({ email, password }) => {
  const user = await userModel.findByEmail(email);
  
  if (!user || user.password !== password) return error;

  const { _id, role } = user;

  const payload = {
    _id,
    email,
    role,
  };

  const options = { expiresIn: '7d' };

  const token = jwt.sign(payload, SECRET, options);

  return token;
};

module.exports = { signIn };