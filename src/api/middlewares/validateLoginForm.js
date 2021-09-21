const Joi = require('joi');

const validateLoginForm = (req, _res, next) => {
  const user = req.body;
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: Joi.string().not().empty().required(),
  });

  const validation = schema.validate(user);

  if (validation.error) next(validation);

  next();
};

module.exports = { validateLoginForm };