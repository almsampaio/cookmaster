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

module.exports = {
  validateUser,
};