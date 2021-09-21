const Joi = require('joi');
const { builtError } = require('../Services/usersServices');

const schemaNewUser = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{8,30}$')).required(),
  role: Joi.string(),
});

const validateNewUser = (req, _res, next) => {
  const check = schemaNewUser.validate(req.body);

  if (check.error) return next(check.error);
  next();
};

const validateLogin = (req, _res, next) => {
  const { email, password } = req.body;
  const valideEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
  if (!email || !password) return next(builtError(401, 'All fields must be filled'));
  if (!valideEmail.test(email) || password.length < 8) {
    return next(builtError(401, 'Incorrect username or password'));
  }
  next();
};

module.exports = {
  validateNewUser,
  validateLogin,
};
