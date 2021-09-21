const findEmail = require('../models/user');

const validateName = (req, res, next) => {
  const { name } = req.body;
  console.log(name);
  if (!name || name === '' || typeof name !== 'string') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const findedEmail = findEmail(email);

  if (!email || !email.test(emailRegex) || typeof email !== 'string') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  if (findedEmail) {
    return res.status(409).json({ message: ' Email already registered ' });
  }

  next();
};

const validatePassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || typeof password !== 'string') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};
