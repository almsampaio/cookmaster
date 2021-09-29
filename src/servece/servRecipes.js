const jwt = require('jsonwebtoken');
const model = require('../model/recipes');

const myKey = 't@nojeito';

const invalidEntries = {
  status: 400,
  error: {
    message: 'Invalid entries. Try again.',
  },
};

const jwtMalformed = {
  status: 401,
  error: {
    message: 'jwt malformed',
  },
};

const missingAuth = {
  status: 401,
  error: {
    message: 'missing auth token',
  },
};

const recipeNot = {
  status: 404,
  error: {
    message: 'recipe not found',
  },
};

const validateRecipe = (recipe) => {
  if (!recipe) throw recipeNot;
};

const validateName = (name) => {
  if (!name) throw invalidEntries;
};

const validateIngredients = (ingredients) => {
  if (!ingredients) throw invalidEntries;
};

const validatePreparation = (preparation) => {
  if (!preparation) throw invalidEntries;
};

const validateAuthentication = (token) => {
  console.log('token', token);
  if (!token) throw missingAuth;
};

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, myKey);
    return decoded;
  } catch (err) {
    throw jwtMalformed;
  }
};

const getOne = async () => {
  const response = await model.getOne();
  return { status: 200, response };
};

const createRecipe = async (token, { name, ingredients, preparation }) => {
  validateName(name);
  validateIngredients(ingredients);
  validatePreparation(preparation);
  const decoded = validateToken(token);
  const response = await model.createRecipe(decoded.data, name, ingredients, preparation);
  return { status: 201, response };
};

const getRecipeById = async (id) => {
  const response = await model.getRecipeById(id);
  console.log(response);
  validateRecipe(response);
  return { status: 200, response };
};

const edit = async (id, token, { name, ingredients, preparation }) => {
  validateAuthentication(token);
  validateToken(token);
  const response = await model.edit(id, name, ingredients, preparation);
  return { status: 200, response };
};

module.exports = {
  getOne,
  createRecipe,
  getRecipeById,
  edit,
};