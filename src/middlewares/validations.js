const { StatusCodes } = require('http-status-codes');

const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  const emailPattern = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const checkEmailEntry = emailPattern.test(email);

  if (!checkEmailEntry || !name || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  
  if (Object.keys(req.body).length <= 1 && (!email || !password)) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'All fields must be filled' });
  }

  next();
};

module.exports = {
  validateUser,
  validateLogin,
};