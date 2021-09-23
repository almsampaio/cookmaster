const httpStatus = require('../utils/httpStatus');
const userModel = require('../models/userModel');

const validationError = { message: 'All fields must be filled' };
const invalidEmailOrPassword = { message: 'Incorrect username or password' };
const adminError = { message: 'Only admins can register new admins' };

const validateEmail = async (req, res, next) => {
  const { email, password } = req.body;

  const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm;

  const validEmail = emailRegex.test(email);

  const checkEmail = await userModel.getUser(email);

  if (!email || !password) {
    return res.status(httpStatus.UNAUTHORIZED).json(validationError);
  }
  if (!validEmail || checkEmail.message) {
    return res.status(httpStatus.UNAUTHORIZED).json(invalidEmailOrPassword);
  }

  next();
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body;
   const checkPassword = await userModel.getUserByPassword(password);

  if (checkPassword.message) {
    return res.status(httpStatus.UNAUTHORIZED).json(validationError);
  }
  if (password.length < 5) {
    return res.status(httpStatus.UNAUTHORIZED).json(validationError);
  }

  next();
};

const validateAdmin = async (req, res, next) => {
  const { role } = req.user;
  if (role !== 'admin') {
    return res.status(httpStatus.FORBIDDEN).json(adminError);
  }

  next();
};

module.exports = {
  validateEmail,
  validatePassword,
  validateAdmin,
};
