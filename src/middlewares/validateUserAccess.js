const Joi = require('joi');
const { UNAUTHORIZED } = require('../utils/statusCodes');

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const validateUserAccess = (req, _res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next({ 
      status: UNAUTHORIZED,
      message: 'All fields must be filled',
    });
  }

  const { error } = userSchema.validate({ email, password });
  
  if (error) {
    return next({
      status: UNAUTHORIZED,
      message: 'Incorrect username or password',
    });
  }
  next();
};

module.exports = validateUserAccess;