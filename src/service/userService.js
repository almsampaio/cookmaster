const Joi = require('@hapi/joi');

const { validateError } = require('./errorValidate');

const model = require('../model/userModel');

const signUpValidationSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const addUser = async (userInfo, role) => {
   const { error } = signUpValidationSchema.validate(userInfo);
   if (error) throw validateError(400, 'Invalid entries. Try again.');

   const foundEmail = await model.searchEmail(userInfo.email);
  if (foundEmail) throw validateError(409, 'Email already registered');

  const registeredUser = await model.addUserRegistration(userInfo, role);
  return registeredUser;
};

module.exports = {
  addUser,
};