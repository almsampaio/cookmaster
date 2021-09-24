const jwt = require('jsonwebtoken');
const userService = require('../services/userService');
const AppError = require('../utils/AppError');

const SECRET = 'my-super-secret-secret';

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await userService.login({ email, password });

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.verify = async (req, _res, next) => {
  try {
    const { authorization: token } = req.headers;

    if (!token) {
      return next(new AppError(401, 'jwt malformed'));
    }

    const decoded = jwt.verify(token, SECRET);
    
    req.user = decoded;

    next();
  } catch (err) {
    next(err);
  }
};
