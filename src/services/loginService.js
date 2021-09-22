const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const JWTsecret = require('../JWTsecret');

async function login({ email, password }) {
    if (!email || !password) {
      return { code: 401, message: 'All fields must be filled' };
    }

    const user = await userModel.getUserByEmail(email);
    if (!user || user.password !== password) {
      return { code: 401, message: 'Incorrect username or password' };
    }

    const JWTconfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const JWTpayload = { email, password };

    const token = jwt.sign(JWTpayload, JWTsecret, JWTconfig);
    return { code: 200, token };
}

module.exports = {
  login,
};