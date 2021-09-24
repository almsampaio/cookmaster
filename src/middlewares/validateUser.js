const Joi = require('joi');
const { BAD_REQUEST } = require('../utils/statusCodes');

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateUser = (req, _res, next) => {
  const { name, email, password } = req.body;
  const { error } = userSchema.validate({ name, email, password });
  if (error) {
    return next({
      status: BAD_REQUEST,
      message: 'Invalid entries. Try again.',
    });
  }
  next();
};

module.exports = validateUser;