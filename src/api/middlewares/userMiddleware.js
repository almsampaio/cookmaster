const emailValidator = require('email-validator');

const BAD_REQUEST = 400;

const INVALID_ENTRIES = 'Invalid entries. Try again.';

const validateFields = (req, res, next) => {
  const { name, email, password } = req.body;
  const validEmail = emailValidator.validate(email);
  if (!name || !email || !password) {
    return res.status(BAD_REQUEST).json({ message: INVALID_ENTRIES });
  }
  if (!validEmail) {
    return res.status(BAD_REQUEST).json({ message: INVALID_ENTRIES });
  }
  next();
};

module.exports = {
  validateFields,
};