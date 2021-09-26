const { ObjectId } = require('mongodb');
const listRecipesService = require('../useCases/listRecipes/listRecipesService');

const { notFound } = require('../utils/httpStatus');

const err = { status: notFound, message: 'recipe not found' };

const authRecipeId = async (request, _response, next) => {
  const { id } = request.params;
  if (!ObjectId.isValid(id)) return next(err);

  const recipe = await listRecipesService.getById(id);
  if (!recipe) return next(err);

  request.recipe = recipe;

  next();
};

module.exports = authRecipeId;
