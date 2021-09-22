const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const SECRET = 'meusupersegredo';

const loginService = async (email, password) => {
  if (!email || !password) {
    return { err: { status: 401, message: 'All fields must be filled' } };
}
  const userByemail = await userModel.getUserByEmail(email);

  if (!userByemail || userByemail.password !== password) {
  return {
    err: { status: 401, message: 'Incorrect username or password' },
  };
}

  const { password: _, ...userPayload } = userByemail;

  const token = jwt.sign(userPayload, SECRET, {
    algorithm: 'HS256',
    expiresIn: '15d',
  });
  
  return token;
};

module.exports = {
  loginService,
};