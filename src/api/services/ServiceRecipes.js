const ModelRecipes = require('../models/ModelRecipes');
const invalidData = require('../utils/invalidData');
const { verifyToken } = require('../middlewares');

const UNAUTHORIZED = 401;
const NOT_FOUND = 404;

const create = async (token, { name, ingredients, preparation }) => {
  const validVerifyToken = await verifyToken(token);

  if (validVerifyToken.message) throw invalidData(validVerifyToken.message, UNAUTHORIZED);

  const { userId } = validVerifyToken;
  const createdRecipe = await ModelRecipes.create({ name, ingredients, preparation, userId });

  return createdRecipe;
};

const getAll = async () => {
  const getAllRecipes = await ModelRecipes.getAll();

  return getAllRecipes;
};

const getById = async (id) => {
  const findRecipe = await ModelRecipes.getById(id);

  if (!findRecipe) throw invalidData('recipe not found', NOT_FOUND);

  return findRecipe;
};

module.exports = {
  create,
  getAll,
  getById,
};
