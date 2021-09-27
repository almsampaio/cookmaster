const statusCode = require('http-status-codes');
const jwt = require('jsonwebtoken');
const loginService = require('../services/loginService');

const key = 'your-secret-key';

const login = async (req, res) => {
  const { email, password } = req.body;
  const userLogin = await loginService.login({ email, password });

  if (userLogin.message) {
  return res.status(statusCode.UNAUTHORIZED).json(
    { message: userLogin.message },
  ); 
}

  const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

  const token = jwt.sign({ data: userLogin }, key, jwtConfig);  

  return res.status(statusCode.OK).json({ token });
};

module.exports = { login };