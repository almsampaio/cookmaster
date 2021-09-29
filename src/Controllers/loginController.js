const JWT = require('jsonwebtoken');
const { HTTP_OK_STATUS } = require('../helpers');
const usersLogin = require('../Models/loginModel');

const secret = 'ihhhhSegredo';
const jwtConfiguration = {
  expiresIn: '1d',
  algorithm: 'HS256',
};
  
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userInfo = await usersLogin.findEmailAndPass(email, password);
    const token = JWT.sign({ data: userInfo }, secret, jwtConfiguration);
    return res.status(HTTP_OK_STATUS).json({ token });
  } catch (e) {
    console.log(e, 'Ihhhh deu erro');
  }
};

module.exports = {
  login,
};