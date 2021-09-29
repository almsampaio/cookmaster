const Joi = require('joi');
const model = require('../../models/Usuarios');

const createValid = (body) => (
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).validate(body)
);

const loginValid = (body) => (
  Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).validate(body)
);

const emailExists = async (email, password) => {
  const getUser = await model.findUser(email);
  if ((getUser && getUser.email) !== email
  || (getUser && getUser.password) !== password) {
    return {
      code: 'UNAUTHORIZATED',
      message: 'Incorrect username or password',
    };
  }
  return getUser;
};

module.exports = {
  createValid,
  loginValid,
  emailExists,
};
