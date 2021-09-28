const ModelRecipes = require('../models/ModelRecipes');
const invalidData = require('../utils/invalidData');
const { verifyToken } = require('../middlewares');

const UNAUTHORIZED = 401;

const create = async (token, { name, ingredients, preparation }) => {
  const validVerifyToken = await verifyToken(token);

  if (validVerifyToken.message) throw invalidData(validVerifyToken.message, UNAUTHORIZED);

  const { userId } = validVerifyToken;
  const createdRecipe = await ModelRecipes.create({ name, ingredients, preparation, userId });

  return createdRecipe;
};

module.exports = {
  create,
};
