const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');

const secretPassword = 'secret';

const jwtconfig = {
  expiresIn: '10d',
  algorithm: 'HS256',
};

const getToken = (user) => {
  const userWithoutPassword = { email: user.email }; // isso aqui vai para o payload

  const token = jwt.sign({ data: userWithoutPassword }, secretPassword, jwtconfig);
  return token;
};

const validateToken = async (req, res, next) => {
  const userToken = req.headers.authorization; // pego o token em base64
  
  if (!userToken) {
    return res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const payload = jwt.verify(userToken, secretPassword); // verifico o token e recebo payload

    const user = await userModel.searchByEmail(payload.email); // pego o user a partir do email
    console.log(user);

    if (!user || user === undefined) {
      return res.status(401).json({ message: 'jwt malformed' });
    }

    req.user = user; // passo o user para ser pego no controller

    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

module.exports = {
  getToken,
  validateToken,
};