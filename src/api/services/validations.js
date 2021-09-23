const Joi = require('joi');
const jwt = require('jsonwebtoken');
const usersModels = require('../models/users');

const JWT_SECRET = 'meuSegredo';

const validateBodyCreateUsers = (body) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  }).validate(body);
  if (error) return { verb: 'post', item: 'createUsers', error, isJoy: true };
  return false;
};

const validateSingleUserEmail = async (email) => {
  const getUserByEmail = await usersModels.getUserByEmail(email);
  if (getUserByEmail.length) return { verb: 'post', item: 'createUsers', error: true };
  return false;
};

const validateBodyLoginUsers = async (body) => {
  let error;
   error = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().required(),
  }).validate(body);
  if (error.error) return { verb: 'post', item: 'loginUsers', error, isJoy: true, filled: false };
  error = Joi.object({
    email: Joi.string().email(),
    password: Joi.string(),
  }).validate(body);

  const existsThisUser = await usersModels.getUserByEmail(body.email);

  if (error.error || !existsThisUser.length) {
 return { 
    verb: 'post', item: 'loginUsers', error, isJoy: true, filled: true, 
  }; 
}
  return false;
};

const validateBodyRecipes = (body) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).validate(body);
  if (error) return error;
  return false;
};

const validateBodyCreateRecipes = (body) => {
  const error = validateBodyRecipes(body);
  if (error) return { verb: 'post', item: 'createRecipes', error, isJoy: true };
  return false;
};

const validateBodyUpdateRecipes = (body) => {
  const error = validateBodyRecipes(body);
  if (error) return { verb: 'put', item: 'uptadeRecipes', error, isJoy: true };
  return false;
};

const validateToken = (token, verb, item) => {
  if (!token) return { verb, item, error: true, isAuthenticToken: false };
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return { error: false, payload };
  } catch (_err) {
    return { verb, item, error: true, isAuthenticToken: true };
  }
};

const validateTokenToCreateRecipes = async (token) => validateToken(token, 'post', 'createRecipes');

const validateTokenToUpdateRecipes = async (token) => {
  const ValidationauthenticatToken = validateToken(token, 'put', 'uptadeRecipes');
  if (ValidationauthenticatToken.error) return ValidationauthenticatToken;

  const { email } = ValidationauthenticatToken.payload;

  const getUserByEmail = await usersModels.getUserByEmail(email);
 
  if (!getUserByEmail.length) {
    return { verb: 'put', item: 'uptadeRecipes', error: true, isAuthenticToken: true };
  }
  return false;
};

const validateRecipeExists = async (id, recipe) => {
  if (!recipe) return { verb: 'get', item: 'getRecipesById', error: true };
  return false;
}; 

module.exports = {
  validateBodyCreateUsers,
  validateSingleUserEmail,
  validateBodyLoginUsers,
  validateBodyCreateRecipes,
  validateBodyUpdateRecipes,
  validateTokenToCreateRecipes,
  validateTokenToUpdateRecipes,
  validateRecipeExists,
};