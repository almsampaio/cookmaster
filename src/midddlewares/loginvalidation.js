const Joi = require('joi');

// Ref: https://www.youtube.com/watch?v=u9kxYilQ9l8

const UNAUTHORIZED_STATUS = 401;

const loginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().required(),
});

const loginValidation = (req, res, next) => {
  const { email, password } = req.body;
  const login = { email, password };

  const { error } = loginSchema.validate(login);

  if (error) {
    return res.status(UNAUTHORIZED_STATUS).json({ message: 'All fields must be filled' });
  }

  next();
};

module.exports = {
  loginValidation,
};
