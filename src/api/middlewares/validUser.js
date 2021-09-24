const Joi = require('joi');
const invalidData = require('../utils/invalidData');

const BAD_REQUEST = 400;
const regexEmail = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

const validUser = (req, _res, next) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().required()
    .messages({
      'any.required': 'Invalid entries. Try again.',
    }),
    email: Joi.string().regex(regexEmail).not().empty()
    .required()
    .messages({
      'string.pattern.base': 'Invalid entries. Try again.',
      'any.required': 'Invalid entries. Try again.',
    }),
    password: Joi.string().not().empty().required()
    .messages({
      'any.required': 'Invalid entries. Try again.',
    }),
  }).validate(req.body);

  if (error) return next(invalidData(error.message, BAD_REQUEST));

  next();
};

module.exports = validUser;
