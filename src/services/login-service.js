const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

const SECRET = 'minhasenha';

const validatingLogin = async (email, password) => {
  if (!email || !password) return { status: 401, message: 'All fields must be filled' };

  const resolt = await userModel.find(email);
  
  if (!resolt) return { status: 401, message: 'Incorrect username or password' };

  if (resolt.password !== password) {
    return { status: 401, message: 'Incorrect username or password' };
  }

  const { password: _, ...userPayload } = resolt;
  
  const token = jwt.sign(userPayload, SECRET, {
    algorithm: 'HS256',
    expiresIn: '15d',
  });
  
  return { token };
};

module.exports = { validatingLogin };
