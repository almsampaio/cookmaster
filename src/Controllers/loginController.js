const JWT = require('jsonwebtoken');
const { HTTP_OK_STATUS } = require('../helpers');

const secret = 'ihhhhSegredo';
const jwtConfiguration = {
  expiresIn: '1d',
  algorithm: 'HS256',
};
  
const login = async (req, res) => {
  try {
    const token = JWT.sign({ data: login }, secret, jwtConfiguration);
    return res.status(HTTP_OK_STATUS).json({ token });
  } catch (e) {
    console.log(e, 'Ihhhh deu erro');
  }
};

module.exports = {
  login,
};