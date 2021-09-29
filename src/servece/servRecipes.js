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

const validateName = (name) => {
  if (!name) throw invalidEntries;
};

const validateIngredients = (ingredients) => {
  if (!ingredients) throw invalidEntries;
};

const validatePreparation = (preparation) => {
  if (!preparation) throw invalidEntries;
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

module.exports = {
  getOne,
  createRecipe,
};