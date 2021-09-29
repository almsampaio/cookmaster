const Joi = require('joi');

function userFields(user) {
  const userSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  });

  return userSchema.validate(user);
}

module.exports = {
  userFields,
};
