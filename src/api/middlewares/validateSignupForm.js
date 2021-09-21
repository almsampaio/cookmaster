const Joi = require('joi');

const validateSignupForm = (req, _res, next) => {
  const user = req.body;

  const schema = Joi.object({
    name: Joi.string().not().empty().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().not().empty().required(),
  });

  const validation = schema.validate(user);

  if (validation.error) next(validation);

  next();
};

module.exports = { validateSignupForm };