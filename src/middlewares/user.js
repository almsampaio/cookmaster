const Joi = require('joi');
const { findEmail, findPassword } = require('../models/user');

const loginJoi = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

// Validações feitas a mão para o Campo name, email e senha do createUser
const validateName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name === '' || typeof name !== 'string') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const findedEmail = await findEmail(email);

  if (!email || !emailRegex.test(email) || typeof email !== 'string') {
    return res.status(400).json({ message: 'Invalid entries. Try again.' });
  }

  if (findedEmail) {
    return res.status(409).json({ message: 'Email already registered' });
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
// Finaliza aqui as validações

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = loginJoi.validate(req.body);
  const findedEmail = await findEmail(email);
  const findedPassword = await findPassword(password);

  if (error) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }

  if (!findedEmail) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  if (!findedPassword) {
    return res.status(401).json({ message: 'Incorrect username or password' });
  }

  next();
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
  validateLogin,
};
