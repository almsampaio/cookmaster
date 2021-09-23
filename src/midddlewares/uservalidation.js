const Joi = require('joi');

const BAD_REQUEST_STATUS = 400;

// Ref: https://www.youtube.com/watch?v=u9kxYilQ9l8

const userSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().required(),
  name: Joi.string().required(),
});

const userValidation = (req, res, next) => {
  const { email, password, name } = req.body;
  const user = { name, email, password };
  const { error } = userSchema.validate(user);

  if (error) {
    return res.status(BAD_REQUEST_STATUS)
      .json({ message: 'Invalid entries. Try again.' });
    }

  next();
};

module.exports = {
  userValidation,
};