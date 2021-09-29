const jwt = require('jsonwebtoken');

const userModel = require('../models/userModel');

const myPassword = 'roleInMySoul';

const jwtConfig = {
  expiresIn: '10d',
  algorithm: 'HS256',
};

const token = (dataWithoutPassword) => {
  const userToken = jwt.sign(dataWithoutPassword, myPassword, jwtConfig);
  return userToken;
};

const tokenValidate = async (req, res, next) => {
  const userToken = req.headers.authorization;
  if (!userToken) {
    res.status(401).json({ message: 'missing auth token' });
  }

  try {
    const payload = jwt.verify(userToken, myPassword);
    const { email } = payload;

    const userValidate = await userModel.getByEmail(email);

    if (!userValidate || userValidate === undefined) {
      return res.status(401).json({ message: 'jwt malformed' });
    }

    req.user = payload;
    next();
} catch (err) {
    return res.status(401).json({ message: 'jwt malformed' });
  }
};
module.exports = {
  token,
  tokenValidate,
};