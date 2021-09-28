const Joi = require('joi');
const invalidData = require('../utils/invalidData');

const UNAUTHORIZED = 401;
const regexEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

const validLogin = (req, _res, next) => {
  const { error } = Joi.object({
    email: Joi.string().regex(regexEmail).not().empty()
    .required()
    .messages({
      'string.pattern.base': 'Incorrect username or password',
      'any.required': 'All fields must be filled',
    }),
    password: Joi.string().not().empty().required()
    .messages({
      'any.required': 'All fields must be filled',
    }),
  }).validate(req.body);

  if (error) return next(invalidData(error.message, UNAUTHORIZED));

  next();
};

module.exports = validLogin;
