const emailValidator = require('email-validator');

const validateFields = (req, res, next) => {
  const { name, email, password } = req.body;
  const isEmailValid = emailValidator.validate(email);

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  if (!isEmailValid) {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  next();
};

module.exports = {
  validateFields,
};