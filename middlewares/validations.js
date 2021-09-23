const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_PASSWORD = process.env.SECRET_TOKEN || 'mySuperMegaSecretToken';

const userModel = require('../models/userModel');

const httpStatus = require('../utils/httpStatus');

const validationTokenError = { message: 'jwt malformed' };
const noTokenError = { message: 'missing auth token' };

const validateAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json(noTokenError);
  }

  try {
    const decoded = await jwt.verify(token, SECRET_PASSWORD);
    // console.log(decoded, 'decoded de validateAuth'); 

    const checkUser = await userModel.getUser(decoded.data.email);

    if (!checkUser || checkUser === undefined) {
      return res.status(httpStatus.UNAUTHORIZED).json(validationTokenError);
    }

    req.user = decoded.data;
    // console.log(decoded.data, 'usuario validação token');
    next();
  } catch (err) {
    return res.status(httpStatus.UNAUTHORIZED).json({ message: err.message });
  }
};

const validationError = { message: 'Invalid entries. Try again.' };

const validateName = async (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(httpStatus.BAD_REQUEST).json(validationError);
  }

  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;

  const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

  const validEmail = emailRegex.test(email);
  if (!email) {
    return res.status(httpStatus.BAD_REQUEST).json(validationError);
  }
  if (!validEmail) {
    return res.status(httpStatus.BAD_REQUEST).json(validationError);
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password) {
    return res.status(httpStatus.BAD_REQUEST).json(validationError);
  }
  if (password.length < 5) {
    return res.status(httpStatus.BAD_REQUEST).json(validationError);
  }

  next();
};

const validateEmailIsUnique = async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.getUser(email);

  if (user.message) {
    next();
  }

  if (user.data) {
    return res.status(httpStatus.CONFLICT_STATUS).json(
      { message: 'Email already registered' },
    );
  }
};

module.exports = {
  validateAuth,
  validateName,
  validateEmail,
  validatePassword,
  validateEmailIsUnique,
};
