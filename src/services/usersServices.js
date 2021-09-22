const Joi = require('joi');
const { JoiPassword } = require('joi-password');

const message = 'Invalid entries. Try again.';

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: JoiPassword.string().required(),
}).error(new Error(message));

const validateUser = (name, email, password) => {
  const joiValidate = userSchema.validate({ name, email, password });

  const { error } = joiValidate;

  if (error) throw new Error(error.message);
};

module.exports = {
  validateUser,
};
