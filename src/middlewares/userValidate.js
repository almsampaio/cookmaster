const userModel = require('../models/userModel');

const errorMessage = 'Invalid entries. Try again.';
const existEmailMessage = 'Email already registered';

const validateName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(400).json({
      message: errorMessage,
    });
  }
  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const regex = /\S+@\S+\.\S+/;
  const result = regex.test(email);
  const existEmail = await userModel.findUserEmail(email);

  if (existEmail) {
    return res.status(409).json({
      message: existEmailMessage,
    });
  }
  if (!email || email === '' || !result) {
    return res.status(400).json({
      message: errorMessage,
    });
  }

  next();
};

module.exports = {
  validateName,
  validateEmail,
};
