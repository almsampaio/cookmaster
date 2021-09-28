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

function validateName(name) {
  if (!name) throw invalidEntries;
}

function validateIngredients(ingredients) {
  if (!ingredients) throw invalidEntries;
}

function validatePreparation(preparation) {
  if (!preparation) throw invalidEntries;
}

function validateToken(token) {
  try {
    const decoded = jwt.verify(token, myKey);
    return decoded;
  } catch (err) {
    throw jwtMalformed;
  }
}

async function createRecipe(token, { name, ingredients, preparation }) {
  validateName(name);
  validateIngredients(ingredients);
  validatePreparation(preparation);
  const decoded = validateToken(token);
  const response = await model.createRecipe(decoded.data, name, ingredients, preparation);
  return { status: 201, response };
}

module.exports = {
  createRecipe,
};