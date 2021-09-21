const Joi = require('joi');

const schemaNewUser = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  role: Joi.string(),
});

const validateNewUser = (req, _res, next) => {
    const check = schemaNewUser.validate(req.body);

    if (check.error) next(check.error);
    next();
};

module.exports = {
    validateNewUser,
};