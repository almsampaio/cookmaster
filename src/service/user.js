const Joi = require('joi');
const userModel = require('../model/user');
const errorObjects = require('../../utils/errorsObject');
const jwt = require('../../utils/jwt');

const validadeNewUser = (name, email, password) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.required(),
  }).validate({ name, email, password });
  if (error) throw errorObjects.invalidEntries;
};

const newUser = async (name, email, password) => {
  validadeNewUser(name, email, password);
  const emailAlreadyUsed = await userModel.emailAlreadyUsed(email);
  if (emailAlreadyUsed) throw errorObjects.emailAlreadyRegistered;
  const result = await userModel.newUser(name, email, password);
  return result;
};

const validateLogin = (email, password) => {
  const { error } = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }).validate({ email, password });
  if (error) throw errorObjects.AllFieldsMustBeFilled;
};

const login = async (email, password) => {
  validateLogin(email, password);
  const checkingLogin = await userModel.checkingLogin(email, password);
  if (!checkingLogin) throw errorObjects.incorrectUsernameOrPassword;
  const token = jwt.generateToken(email);
  return token;
};

module.exports = {
  newUser,
  login,
};