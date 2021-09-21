const Joi = require('joi');
const { builtError } = require('../Services/usersServices');

const schemaNewUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string(),
});

const schemaNewRecipe = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const validateNewUser = (req, _res, next) => {
  const check = schemaNewUser.validate(req.body);

  if (check.error) return next(check.error);
  next();
};

const validateLogin = (req, _res, next) => {
  const { email, password } = req.body;
  const valideEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]/i;
  if (!email || !password) return next(builtError(401, 'All fields must be filled'));
  if (!valideEmail.test(email) || password.length < 8) {
    return next(builtError(401, 'Incorrect username or password'));
  }
  next();
};

const validateNewRecipe = (req, _res, next) => {
  const check = schemaNewRecipe.validate(req.body);

  if (check.error) return next(check.error);
  next();
};

module.exports = {
  validateNewUser,
  validateLogin,
  validateNewRecipe,
};
